const puppeteer = require('puppeteer-core');

async function testAllProjects() {
  console.log('--- Testing Complete Portfolio Suite (10 Projects, 5 Categories) ---');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('1. Navigating to homepage...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  // Scroll to Portfolio
  await page.evaluate(() => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));

  // Verify tabs
  const tabs = await page.$$eval('#portfolio [role="tab"]', els => els.map(e => e.textContent.trim()));
  console.log('Portfolio Tabs found:', tabs);
  const expectedTabs = ['Alle', 'Film & Fictie', 'Social Media & Content', 'Graphic Design', 'Fotografie'];
  expectedTabs.forEach(t => {
    if (!tabs.includes(t)) throw new Error(`Missing expected tab: ${t}`);
  });

  // Verify Alle (10 cards)
  const allCards = await page.$$eval('#portfolio a[href^="#"]', els => els.map(e => ({
    href: e.getAttribute('href'),
    title: e.querySelector('span.font-serif')?.textContent?.trim() || ''
  })));
  console.log(`Cards under "Alle" (${allCards.length}):`, allCards);
  if (allCards.length !== 10) {
    throw new Error(`Expected 10 cards under Alle, found ${allCards.length}`);
  }

  // Helper to click tab and verify filtered count
  async function testFilter(tabName, expectedCount, expectedSlugs) {
    console.log(`Testing filter: "${tabName}" (expecting ${expectedCount} cards)...`);
    await page.evaluate((name) => {
      const tabButtons = Array.from(document.querySelectorAll('#portfolio [role="tab"]'));
      const target = tabButtons.find(b => b.textContent.trim().toLowerCase() === name.toLowerCase());
      if (target) target.click();
    }, tabName);
    await new Promise(r => setTimeout(r, 300));

    const cards = await page.$$eval('#portfolio a[href^="#"]', els => els.map(e => e.getAttribute('href')));
    console.log(`  Filtered hrefs for ${tabName}:`, cards);
    if (cards.length !== expectedCount) {
      throw new Error(`Filter "${tabName}" returned ${cards.length} cards, expected ${expectedCount}`);
    }
    expectedSlugs.forEach(slug => {
      if (!cards.includes(slug)) throw new Error(`Filter "${tabName}" missing expected slug: ${slug}`);
    });
  }

  await testFilter('Film & Fictie', 2, ['#mustang', '#cracked']);
  await testFilter('Social Media & Content', 2, ['#twins', '#throwers-lab']);
  await testFilter('Graphic Design', 5, ['#beyond-bases', '#logo-design', '#twins-graphics', '#boer-tot-bord', '#unpluggd']);
  await testFilter('Fotografie', 1, ['#sportfotografie']);

  // Reset to Alle
  await testFilter('Alle', 10, ['#mustang', '#cracked', '#twins', '#throwers-lab', '#beyond-bases', '#logo-design', '#twins-graphics', '#boer-tot-bord', '#unpluggd', '#sportfotografie']);

  // Test opening each of the 5 new project pages
  const newProjects = [
    { slug: '#beyond-bases', expectedHeadline: 'Wear your story', minStills: 2 },
    { slug: '#twins-graphics', expectedHeadline: 'Karaktervolle social media graphics', minStills: 2 },
    { slug: '#boer-tot-bord', expectedHeadline: 'Van eigen bodem, rechtstreeks naar jouw bord', minStills: 1 },
    { slug: '#unpluggd', expectedHeadline: 'When screens fade away', minStills: 1 },
    { slug: '#sportfotografie', expectedHeadline: 'Het juiste moment op het veld', minStills: 2 }
  ];

  for (const proj of newProjects) {
    console.log(`Testing project page ${proj.slug}...`);
    await page.goto(`http://localhost:3000/${proj.slug}`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 500));

    const pageInfo = await page.evaluate(() => {
      const h1 = document.querySelector('h1')?.textContent?.trim() || '';
      const stills = Array.from(document.querySelectorAll('section[aria-label="Character Stills Gallery"] button img'))
        .map(img => img.getAttribute('src'));
      const backBtn = Boolean(document.querySelector('header button'));
      return { h1, stills, backBtn };
    });

    console.log(`  Page ${proj.slug}:`, { headline: pageInfo.h1, stillsCount: pageInfo.stills.length });
    if (!pageInfo.h1.toLowerCase().includes(proj.expectedHeadline.toLowerCase())) {
      throw new Error(`Project ${proj.slug} headline mismatch: got "${pageInfo.h1}"`);
    }
    if (pageInfo.stills.length < proj.minStills) {
      throw new Error(`Project ${proj.slug} has ${pageInfo.stills.length} stills, expected >= ${proj.minStills}`);
    }
    if (!pageInfo.backBtn) {
      throw new Error(`Project ${proj.slug} missing back button`);
    }
  }

  // Test English Toggle
  console.log('Testing English language toggle...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 500));

  await page.evaluate(() => {
    const langBtn = Array.from(document.querySelectorAll('header button')).find(b => b.textContent.includes('EN') || b.textContent.includes('NL'));
    if (langBtn) langBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  const enTabs = await page.$$eval('#portfolio [role="tab"]', els => els.map(e => e.textContent.trim()));
  console.log('English Portfolio tabs:', enTabs);
  if (!enTabs.includes('Photography') || !enTabs.includes('Graphic Design') || !enTabs.includes('Film & Fiction')) {
    throw new Error('English tab names not updated properly');
  }

  // Test mobile 375px
  console.log('Testing mobile 375px viewport...');
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const mobileCheck = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('375px metrics:', mobileCheck);
  if (mobileCheck.overflow) {
    throw new Error(`Horizontal overflow detected at 375px width! scrollWidth=${mobileCheck.scrollWidth}`);
  }

  console.log('>>> ALL 10 PROJECTS & 5 CATEGORIES VERIFIED WITH 100% SUCCESS! <<<');
  await browser.close();
}

testAllProjects().catch(err => {
  console.error('VERIFICATION FAILED:', err);
  process.exit(1);
});

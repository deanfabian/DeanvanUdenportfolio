const puppeteer = require('puppeteer-core');

async function verify() {
  console.log('--- Starting Graphic Design & Logo Verification ---');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // 1. Load the dev server page
  console.log('Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  // 2. Scroll down to Portfolio
  await page.evaluate(() => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));

  // 3. Verify category tabs
  const tabs = await page.evaluate(() => {
    const tabButtons = Array.from(document.querySelectorAll('#portfolio [role="tab"]'));
    return tabButtons.map(b => b.textContent.trim());
  });
  console.log('Found Portfolio tabs:', tabs);
  if (!tabs.includes('Graphic Design')) {
    throw new Error('Tab "Graphic Design" is missing!');
  }

  // 4. Test filtering by Graphic Design
  console.log('Clicking "Graphic Design" tab...');
  await page.evaluate(() => {
    const tabButtons = Array.from(document.querySelectorAll('#portfolio [role="tab"]'));
    const designTab = tabButtons.find(b => b.textContent.trim().toLowerCase().includes('graphic design'));
    if (designTab) designTab.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const filteredCards = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#portfolio a[href^="#"]'));
    return cards.map(c => ({
      href: c.getAttribute('href'),
      title: c.querySelector('span.font-serif')?.textContent?.trim() || '',
      img: c.querySelector('img')?.getAttribute('src') || ''
    }));
  });
  console.log('Cards under Graphic Design:', filteredCards);
  if (filteredCards.length !== 1 || !filteredCards[0].href.includes('logo-design')) {
    throw new Error('Filtering by Graphic Design did not return exactly the Logo Design card!');
  }

  // 5. Click "Alle" tab to see all 5 cards
  console.log('Clicking "Alle" tab...');
  await page.evaluate(() => {
    const tabButtons = Array.from(document.querySelectorAll('#portfolio [role="tab"]'));
    const allTab = tabButtons.find(b => b.textContent.trim().toLowerCase() === 'alle');
    if (allTab) allTab.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const allCards = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#portfolio a[href^="#"]'));
    return cards.map(c => ({
      href: c.getAttribute('href'),
      title: c.querySelector('span.font-serif')?.textContent?.trim() || '',
      img: c.querySelector('img')?.getAttribute('src') || ''
    }));
  });
  console.log('Total cards under "Alle":', allCards.length);
  allCards.forEach(c => console.log('  -', c.title, c.href, c.img));
  if (allCards.length !== 5) {
    throw new Error(`Expected 5 cards under Alle, found ${allCards.length}`);
  }

  // 6. Test The Throwers Lab project page (#throwers-lab)
  console.log('Navigating to #throwers-lab...');
  await page.goto('http://localhost:3000/#throwers-lab', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const throwersLabStills = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('section[aria-label="Character Stills Gallery"] button'));
    return buttons.map(b => b.querySelector('img')?.getAttribute('src') || '');
  });
  console.log('The Throwers Lab stills count:', throwersLabStills.length);
  console.log('Throwers Lab stills:', throwersLabStills);
  if (throwersLabStills.length < 5) {
    throw new Error('The Throwers Lab stills do not include the logo variants!');
  }

  // 7. Test Logo Design project page (#logo-design)
  console.log('Navigating to #logo-design...');
  await page.goto('http://localhost:3000/#logo-design', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const logoDesignStills = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('section[aria-label="Character Stills Gallery"] button'));
    const title = document.querySelector('h1')?.textContent?.trim() || '';
    return {
      title,
      stills: buttons.map(b => b.querySelector('img')?.getAttribute('src') || '')
    };
  });
  console.log('Logo Design headline:', logoDesignStills.title);
  console.log('Logo Design stills:', logoDesignStills.stills);
  if (logoDesignStills.stills.length !== 2) {
    throw new Error('Expected 2 logo stills (dark and light) in Logo Design project!');
  }

  // 8. Test back button
  console.log('Clicking back button on #logo-design...');
  await page.evaluate(() => {
    const backBtn = document.querySelector('header button');
    if (backBtn) backBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  const currentUrl = page.url();
  console.log('URL after back button:', currentUrl);

  // 9. Check 375px mobile viewport responsiveness
  console.log('Testing 375px mobile responsiveness...');
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  const mobileCheck = await page.evaluate(() => {
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    return {
      scrollWidth,
      clientWidth,
      hasHorizontalOverflow: scrollWidth > clientWidth
    };
  });
  console.log('Mobile viewport metrics:', mobileCheck);
  if (mobileCheck.hasHorizontalOverflow) {
    throw new Error(`Horizontal overflow detected at 375px! scrollWidth=${mobileCheck.scrollWidth}`);
  }

  console.log('--- ALL CHECKS PASSED SUCCESSFULLY! ---');
  await browser.close();
}

verify().catch(err => {
  console.error('VERIFICATION FAILED:', err);
  process.exit(1);
});

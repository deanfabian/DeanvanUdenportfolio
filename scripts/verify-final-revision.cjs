const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function test() {
  const screenshotsDir = path.join(__dirname, '..', 'public', 'test-screenshots-final');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('=== 1. Testing Welcome Screen & Opening Sequence ===');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const welcomeTitle = await page.$eval('h1', el => el.innerText.trim());
  console.log('Title:', welcomeTitle);
  if (welcomeTitle !== 'Dean van Uden') {
    throw new Error(`Expected "Dean van Uden", got "${welcomeTitle}"`);
  }

  // Check Nav labels - no pseudo numbers like 01, 02, 03
  const navTexts = await page.$$eval('nav[aria-label="Navigation Tabs"] a', els => els.map(e => e.innerText.trim()));
  console.log('Nav items:', navTexts);
  if (navTexts.some(t => /\d/.test(t))) {
    throw new Error('Nav items should not have pseudo-numbers like 01/02');
  }

  // Scroll down to check "Kom binnen."
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.8));
  await new Promise(r => setTimeout(r, 400));
  const comeInText = await page.evaluate(() => document.querySelector('[class*="bottom-10"] p')?.innerText.trim());
  console.log('Stage 4 prompt:', comeInText);
  if (!comeInText?.includes('Kom binnen')) {
    throw new Error(`Expected "Kom binnen.", got "${comeInText}"`);
  }

  await page.screenshot({ path: path.join(screenshotsDir, '01-welcome-sequence.png') });

  console.log('=== 2. Testing Story Section ===');
  await page.evaluate(() => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  // Check Opening text
  const storyText = await page.$eval('#story', el => el.innerText);
  console.log('Checking Story exact Dutch sentences...');
  const expectedSnippets = [
    'Je liep langs honderd ramen om hier te komen.',
    'Achter elk ervan zat iemand.',
    'Dit is wat er achter het mijne zit.',
    'I. Het kader',
    'Een man die gelooft dat een houten stok het beste paard ter wereld is.',
    'Een kok die alles kan, behalve een ei breken.',
    'II. De feed',
    'Een clubpagina heeft geen budget en geen tv-ploeg.',
    'The Throwers Lab, een ontwikkelingsprogramma voor jonge werpers',
    'III. Buiten beeld',
    'Als ik geen camera vasthoud, sta ik meestal op een veld.',
    'Ik speel in Heren 2 van Brabant Twins.',
    'IV. Het volgende raam',
    'Ik zoek mijn volgende kamer.',
    'Ergens met veel ramen.',
  ];

  for (const snippet of expectedSnippets) {
    if (!storyText.includes(snippet)) {
      throw new Error(`Missing expected snippet in story: "${snippet}"`);
    }
  }
  console.log('All Dutch Story snippets verified successfully.');

  // Check story quiet links
  const storyLinks = await page.$$eval('#story a', els => els.map(e => ({
    text: e.innerText.trim(),
    href: e.getAttribute('href')
  })));
  console.log('Story links found:', storyLinks);
  const mustangLink = storyLinks.find(l => l.href === '#mustang');
  const crackedLink = storyLinks.find(l => l.href === '#cracked');
  const twinsLink = storyLinks.find(l => l.href === '#twins');
  const throwersLabLink = storyLinks.find(l => l.href === '#throwers-lab');
  const contactLink = storyLinks.find(l => l.href === '#contact');

  if (!mustangLink || !crackedLink || !twinsLink || !throwersLabLink || !contactLink) {
    throw new Error('Missing required story link (Mustang, CRACKED, Twins, Throwers Lab, or Contact)');
  }

  // Check max 60ch single column
  const storyWidth = await page.$eval('#story > div', el => el.className);
  console.log('Story container class:', storyWidth);
  if (!storyWidth.includes('max-w-[60ch]')) {
    throw new Error('Story container should be max-w-[60ch]');
  }

  await page.screenshot({ path: path.join(screenshotsDir, '02-story-section.png') });

  console.log('=== 3. Testing Portfolio Section ===');
  await page.evaluate(() => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  const portfolioHeading = await page.$eval('#portfolio h2', el => el.innerText.trim());
  console.log('Portfolio heading:', portfolioHeading);
  if (portfolioHeading !== 'Films en content.') {
    throw new Error(`Expected "Films en content.", got "${portfolioHeading}"`);
  }

  // Verify 4 cards in exact required order
  const cardTitles = await page.$$eval('#portfolio a[href^="#"]', els => els.map(e => {
    const text = e.querySelector('span.font-serif')?.innerText.trim() || '';
    return {
      href: e.getAttribute('href'),
      titleWithArrow: text,
      meta: e.querySelector('div.text-xs')?.innerText.trim(),
      type: e.querySelector('p.text-xs')?.innerText.trim()
    };
  }));
  console.log('Portfolio cards:', cardTitles);

  if (cardTitles.length !== 4) {
    throw new Error(`Expected 4 cards, got ${cardTitles.length}`);
  }
  if (!cardTitles[0].titleWithArrow.includes('Mustang →')) throw new Error('Card 1 should be Mustang →');
  if (!cardTitles[1].titleWithArrow.includes('CRACKED →')) throw new Error('Card 2 should be CRACKED →');
  if (!cardTitles[2].titleWithArrow.includes('Brabant Twins →')) throw new Error('Card 3 should be Brabant Twins →');
  if (!cardTitles[3].titleWithArrow.includes('The Throwers Lab →')) throw new Error('Card 4 should be The Throwers Lab →');

  // Verify "Bekijk project" is removed everywhere
  const hasBekijkProject = await page.evaluate(() => document.body.innerText.includes('Bekijk project'));
  console.log('Has "Bekijk project" anywhere?', hasBekijkProject);
  if (hasBekijkProject) throw new Error('"Bekijk project" should be removed completely');

  // Test filters
  const filterTabs = await page.$$('#portfolio button[role="tab"]');
  console.log(`Found ${filterTabs.length} filter tabs`);

  // Film filter
  await filterTabs[1].click();
  await new Promise(r => setTimeout(r, 300));
  let filteredHrefs = await page.$$eval('#portfolio a[href^="#"]', els => els.map(e => e.getAttribute('href')));
  console.log('Film filtered hrefs:', filteredHrefs);
  if (!filteredHrefs.includes('#mustang') || !filteredHrefs.includes('#cracked') || filteredHrefs.includes('#twins') || filteredHrefs.includes('#throwers-lab')) {
    throw new Error('Film & Fictie filter failed');
  }

  // Social filter
  await filterTabs[2].click();
  await new Promise(r => setTimeout(r, 300));
  filteredHrefs = await page.$$eval('#portfolio a[href^="#"]', els => els.map(e => e.getAttribute('href')));
  console.log('Social filtered hrefs:', filteredHrefs);
  if (!filteredHrefs.includes('#twins') || !filteredHrefs.includes('#throwers-lab') || filteredHrefs.includes('#mustang') || filteredHrefs.includes('#cracked')) {
    throw new Error('Social Media & Content filter failed');
  }

  // Reset filter to All
  await filterTabs[0].click();
  await new Promise(r => setTimeout(r, 300));

  await page.screenshot({ path: path.join(screenshotsDir, '03-portfolio-section.png') });

  console.log('=== 4. Testing Contact Section ===');
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  const contactTitle = await page.$eval('#contact h2', el => el.innerText.trim());
  const contactSubtext = await page.$eval('#contact p', el => el.innerText.trim());
  console.log('Contact title & subtext:', { contactTitle, contactSubtext });
  if (contactTitle !== 'Mail me.') throw new Error(`Expected "Mail me.", got "${contactTitle}"`);
  if (!contactSubtext.includes('Over een stage, een productie of content.')) {
    throw new Error(`Expected subtext "Over een stage, een productie of content.", got "${contactSubtext}"`);
  }

  // Verify no form is present
  const formCount = await page.$$eval('#contact form', els => els.length);
  console.log('Form count in contact section:', formCount);
  if (formCount !== 0) throw new Error('Form should be removed when no FORMSPREE_ID is given');

  // Verify email and buttons
  const emailLink = await page.$eval('#contact a[href^="mailto:"]', el => el.innerText.trim());
  console.log('Email link text:', emailLink);
  if (emailLink !== 'deanfabianvanuden@gmail.com') throw new Error('Email mismatch');

  // Verify copy button
  await page.click('#contact button');
  await new Promise(r => setTimeout(r, 300));
  const copiedState = await page.$eval('#contact button', el => el.innerText.trim());
  console.log('Copy button state after click:', copiedState);
  if (!copiedState.toLowerCase().includes('gekopieerd')) throw new Error('Copy button did not show "Gekopieerd"');

  await page.screenshot({ path: path.join(screenshotsDir, '04-contact-section.png') });

  console.log('=== 5. Testing English Toggle (NL -> EN) ===');
  await page.click('button[aria-label*="language"]');
  await new Promise(r => setTimeout(r, 400));

  const enPortfolioHeading = await page.$eval('#portfolio h2', el => el.innerText.trim());
  console.log('EN Portfolio heading:', enPortfolioHeading);
  if (enPortfolioHeading !== 'Films and content.') {
    throw new Error(`Expected "Films and content.", got "${enPortfolioHeading}"`);
  }

  const enStoryText = await page.$eval('#story', el => el.innerText);
  if (!enStoryText.includes('You walked past a hundred windows to get here.') ||
      !enStoryText.includes('I. The frame') ||
      !enStoryText.includes('A man who believes a wooden stick is the best horse in the world.')) {
    throw new Error('EN Story translation missing expected plain English text');
  }
  console.log('EN Story plain translation verified.');

  const enContactSubtext = await page.$eval('#contact p', el => el.innerText.trim());
  console.log('EN Contact subtext:', enContactSubtext);
  if (!enContactSubtext.includes('About an internship, a production, or content.')) {
    throw new Error('EN Contact subtext mismatch');
  }

  await page.screenshot({ path: path.join(screenshotsDir, '05-english-mode.png') });

  // Toggle back to NL
  await page.click('button[aria-label*="language"]');
  await new Promise(r => setTimeout(r, 400));

  console.log('=== 6. Testing All 4 Project Pages ===');
  const projectSlugs = ['mustang', 'cracked', 'twins', 'throwers-lab'];
  for (const slug of projectSlugs) {
    await page.goto(`http://localhost:3000/#${slug}`, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 600));

    const pTitle = await page.evaluate(() => document.querySelector('h1')?.innerText.trim());
    console.log(`Project #${slug} page loaded with headline:`, pTitle?.slice(0, 50));
    if (!pTitle) throw new Error(`Project #${slug} failed to load headline`);

    await page.screenshot({ path: path.join(screenshotsDir, `06-project-${slug}.png`) });

    // Click back to portfolio
    await page.click('header button');
    await new Promise(r => setTimeout(r, 400));
  }

  console.log('=== 7. Testing 375px Mobile Viewport (iPhone SE) ===');
  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  // Check horizontal scroll
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  console.log('375px Viewport document scrollWidth:', scrollWidth);
  if (scrollWidth > 375) {
    throw new Error(`Horizontal scroll detected on 375px viewport! scrollWidth: ${scrollWidth}`);
  }

  // Scroll to contact on 375px
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));

  // Verify email does NOT wrap onto 2 lines
  const emailBox = await page.$eval('#contact a[href^="mailto:"]', el => {
    const rect = el.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      fontSize: window.getComputedStyle(el).fontSize,
    };
  });
  console.log('Email box at 375px width:', emailBox);
  // Single line of text with font size ~18-24px has height < 40px; wrapped text would be > 45px
  if (emailBox.height > 45) {
    throw new Error(`Email appears to wrap onto multiple lines: height is ${emailBox.height}px`);
  }

  await page.screenshot({ path: path.join(screenshotsDir, '07-mobile-375-contact.png') });

  // Scroll to portfolio on 375px
  await page.evaluate(() => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotsDir, '08-mobile-375-portfolio.png') });

  await browser.close();
  console.log('>>> ALL VERIFICATION CHECKS PASSED WITH 100% SUCCESS! <<<');
}

test().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

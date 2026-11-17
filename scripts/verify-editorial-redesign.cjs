const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function test() {
  const screenshotsDir = path.join(__dirname, '..', 'public', 'test-screenshots-editorial');
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

  console.log('--- 1. Testing Welcome Screen & Editorial Masthead ---');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  const welcomeTitle = await page.$eval('h1', el => el.innerText.trim());
  console.log('Welcome title text:', welcomeTitle);
  if (welcomeTitle !== 'Dean van Uden') {
    throw new Error(`Expected "Dean van Uden", got "${welcomeTitle}"`);
  }

  // Check Architectural Masthead
  const mastheadText = await page.$eval('header', el => el.innerText.trim());
  console.log('Masthead summary:', mastheadText.replace(/\n+/g, ' '));

  await page.screenshot({ path: path.join(screenshotsDir, '01-welcome-editorial.png') });

  console.log('--- 2. Testing Text Selectability ---');
  const isSelectable = await page.evaluate(() => {
    const el = document.querySelector('h1');
    const style = window.getComputedStyle(el);
    return style.userSelect !== 'none';
  });
  console.log('Heading text selectable:', isSelectable);
  if (!isSelectable) throw new Error('Text is still user-select: none!');

  console.log('--- 3. Testing Portfolio Section ---');
  await page.evaluate(() => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  const portfolioBadge = await page.$eval('#portfolio', el => el.innerText.includes('№ 01 / ARCHIEF & PRODUCTIE'));
  console.log('Portfolio has editorial badge № 01:', portfolioBadge);
  if (!portfolioBadge) throw new Error('Editorial badge missing in portfolio');

  await page.screenshot({ path: path.join(screenshotsDir, '02-portfolio-editorial.png') });

  // Test category filters
  const filterButtons = await page.$$('#portfolio button[role="tab"]');
  console.log(`Found ${filterButtons.length} category filter buttons`);
  await filterButtons[1].click(); // Fictie & Film
  await new Promise(r => setTimeout(r, 300));
  let cards = await page.$$eval('#portfolio a[href^="#"]', els => els.map(e => e.getAttribute('href')));
  console.log('Filtered films:', cards);
  if (cards.includes('#twins') || !cards.includes('#mustang') || !cards.includes('#cracked')) {
    throw new Error('Film & Fictie filter mismatch');
  }

  await filterButtons[2].click(); // Sport & Social
  await new Promise(r => setTimeout(r, 300));
  cards = await page.$$eval('#portfolio a[href^="#"]', els => els.map(e => e.getAttribute('href')));
  console.log('Filtered social:', cards);
  if (!cards.includes('#twins') || cards.includes('#mustang')) {
    throw new Error('Social filter mismatch');
  }

  // Reset to all
  await filterButtons[0].click();
  await new Promise(r => setTimeout(r, 300));

  console.log('--- 4. Testing Story Section ---');
  await page.evaluate(() => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  const storyBadge = await page.$eval('#story', el => el.innerText.includes('№ 02 / DOSSIER & WERKWIJZE'));
  console.log('Story has editorial badge № 02:', storyBadge);
  if (!storyBadge) throw new Error('Editorial badge missing in story');

  const storyStats = await page.$$eval('#story .divide-y > div', els => els.map(e => e.innerText.trim().replace(/\n+/g, ' ')));
  console.log('Dossier colophon rows:', storyStats);

  await page.screenshot({ path: path.join(screenshotsDir, '03-story-editorial.png') });

  console.log('--- 5. Testing Contact Section ---');
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  const contactBadge = await page.$eval('#contact', el => el.innerText.includes('№ 03 / CONTACT & SAMENWERKING'));
  console.log('Contact has editorial badge № 03:', contactBadge);
  if (!contactBadge) throw new Error('Editorial badge missing in contact');

  const contactEmail = await page.$eval('#contact a[href^="mailto:"]', el => el.innerText.trim());
  console.log('Contact email:', contactEmail);
  if (contactEmail !== 'deanfabianvanuden@gmail.com') {
    throw new Error('Contact email mismatch');
  }

  // Submit form
  await page.type('#contact input[type="text"]', 'Alexander de Wit');
  await page.type('#contact input[type="email"]', 'alexander@studiobrabant.nl');
  await page.type('#contact textarea', 'Beste Dean, we zoeken een producent voor een nieuwe korte dramaproductie in Breda.');
  await page.click('#contact button[type="submit"]');
  await new Promise(r => setTimeout(r, 1200));

  const successMessage = await page.$eval('#contact', el => el.innerText.includes('Aanvraag ontvangen'));
  console.log('Form submission received confirmation:', successMessage);
  if (!successMessage) throw new Error('Form confirmation message not shown');

  await page.screenshot({ path: path.join(screenshotsDir, '04-contact-editorial.png') });

  console.log('--- 6. Testing Language Toggle ---');
  await page.click('button[aria-label*="language"]');
  await new Promise(r => setTimeout(r, 400));

  const enTitle = await page.$eval('#portfolio h2', el => el.innerText.trim());
  console.log('English Portfolio title:', enTitle);
  if (enTitle !== 'Selected Productions') {
    throw new Error(`Expected "Selected Productions", got "${enTitle}"`);
  }

  await page.screenshot({ path: path.join(screenshotsDir, '05-english-editorial.png') });

  // Toggle back to Dutch
  await page.click('button[aria-label*="language"]');
  await new Promise(r => setTimeout(r, 400));

  console.log('--- 7. Testing Mobile Viewport (iPhone 14 Pro - 393x852) ---');
  await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(screenshotsDir, '06-mobile-welcome.png') });

  await page.evaluate(() => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotsDir, '07-mobile-portfolio.png') });

  await page.evaluate(() => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotsDir, '08-mobile-story.png') });

  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotsDir, '09-mobile-contact.png') });

  await browser.close();
  console.log('>>> All Editorial Redesign tests passed successfully! <<<');
}

test().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

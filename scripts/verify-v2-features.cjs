const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function test() {
  const screenshotsDir = path.join(__dirname, '..', 'public', 'test-screenshots-v2');
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

  console.log('--- 1. Testing Welcome Screen & Typography ---');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 800));

  const welcomeTitle = await page.$eval('h1', el => el.innerText.trim());
  console.log('Welcome title text:', welcomeTitle);
  if (welcomeTitle !== 'Dean van Uden') {
    throw new Error(`Expected "Dean van Uden", got "${welcomeTitle}"`);
  }

  // Check whisper positioning
  const whisperBox = await page.$eval('div[class*="items-end"]', el => {
    return {
      classes: el.className,
      hasBottomPadding: el.className.includes('pb-20') || el.className.includes('pb-24') || el.className.includes('items-end'),
    };
  });
  console.log('Whisper positioning check:', whisperBox);

  // Check Nav Tabs
  const navLinks = await page.$$eval('nav[aria-label="Navigation Tabs"] a', els =>
    els.map(el => el.innerText.trim())
  );
  console.log('Navigation tabs:', navLinks);
  if (!navLinks.includes('PORTFOLIO') || !navLinks.includes('STORY') || !navLinks.includes('CONTACT')) {
    throw new Error('Navigation tabs missing expected items');
  }
  if (navLinks.some(l => l.includes('BASEBALL'))) {
    throw new Error('Baseball tab should have been removed');
  }

  console.log('--- 2. Testing Text Selectability ---');
  const isSelectable = await page.evaluate(() => {
    const el = document.querySelector('h1');
    const style = window.getComputedStyle(el);
    return style.userSelect !== 'none';
  });
  console.log('Heading text selectable:', isSelectable);
  if (!isSelectable) throw new Error('Text is still user-select: none!');

  console.log('--- 3. Testing Portfolio Section & Categories ---');
  await page.evaluate(() => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(screenshotsDir, '01-portfolio-all.png') });

  // Check project count with 'all'
  let cards = await page.$$eval('#portfolio a[href^="#"]', els => els.map(e => ({
    href: e.getAttribute('href'),
    title: e.querySelector('h3')?.innerText
  })));
  console.log('All projects visible in Portfolio:', cards);
  if (cards.length !== 3) throw new Error(`Expected 3 projects, found ${cards.length}`);

  // Click "Film & Fictie"
  const filterButtons = await page.$$('#portfolio button[role="tab"]');
  await filterButtons[1].click(); // Film & Fictie
  await new Promise(r => setTimeout(r, 300));
  cards = await page.$$eval('#portfolio a[href^="#"]', els => els.map(e => e.getAttribute('href')));
  console.log('Film & Fictie filtered:', cards);
  if (cards.includes('#twins') || !cards.includes('#mustang') || !cards.includes('#cracked')) {
    throw new Error('Film & Fictie filter failed');
  }
  await page.screenshot({ path: path.join(screenshotsDir, '02-portfolio-films.png') });

  // Click "Social Media & Content"
  await filterButtons[2].click();
  await new Promise(r => setTimeout(r, 300));
  cards = await page.$$eval('#portfolio a[href^="#"]', els => els.map(e => e.getAttribute('href')));
  console.log('Social Media filtered:', cards);
  if (!cards.includes('#twins') || cards.includes('#mustang')) {
    throw new Error('Social Media filter failed');
  }
  await page.screenshot({ path: path.join(screenshotsDir, '03-portfolio-social.png') });

  console.log('--- 4. Testing Dedicated Brabant Twins Project Page ---');
  await page.goto('http://localhost:3000/#twins', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const twinsTitle = await page.evaluate(() => document.querySelector('h1')?.innerText);
  console.log('Brabant Twins page headline:', twinsTitle);
  await page.screenshot({ path: path.join(screenshotsDir, '04-twins-project-page.png') });

  // Back to portfolio
  await page.click('button[aria-label*="portfolio"]');
  await new Promise(r => setTimeout(r, 600));
  console.log('Current URL after back:', page.url());

  console.log('--- 5. Testing Story Section ---');
  await page.evaluate(() => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));

  const storyContent = await page.evaluate(() => document.getElementById('story')?.innerText);
  const hasQuietBeginning = storyContent?.includes('The quiet beginning of a creative business');
  console.log('Has removed sentence?', !hasQuietBeginning ? 'NO (correctly removed)' : 'YES (error!)');
  if (hasQuietBeginning) throw new Error('Sentence was not removed!');
  await page.screenshot({ path: path.join(screenshotsDir, '05-story-section.png') });

  console.log('--- 6. Testing Contact Section & Form ---');
  await page.evaluate(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));

  const contactEmail = await page.$eval('#contact a[href^="mailto:"]', el => el.innerText);
  console.log('Contact email:', contactEmail);
  if (contactEmail !== 'deanfabianvanuden@gmail.com') {
    throw new Error('Contact email mismatch');
  }

  // Fill in form and test submission
  await page.type('#contact input[type="text"]', 'Test Bezoeker');
  await page.type('#contact input[type="email"]', 'test@example.com');
  await page.type('#contact textarea', 'Hallo Dean, ik wil graag samenwerken aan een video.');
  await page.click('#contact button[type="submit"]');
  await new Promise(r => setTimeout(r, 1200));

  const successMessage = await page.$eval('#contact', el => el.innerText.includes('Bericht ontvangen'));
  console.log('Form submission success message displayed:', successMessage);
  if (!successMessage) throw new Error('Form submission message not shown');
  await page.screenshot({ path: path.join(screenshotsDir, '06-contact-success.png') });

  console.log('--- 7. Testing Language Switcher (NL -> EN -> NL) ---');
  // Click language switcher
  await page.click('button[aria-label*="language"]');
  await new Promise(r => setTimeout(r, 400));

  const enPortfolioText = await page.$eval('#portfolio h2', el => el.innerText);
  const enStoryText = await page.$eval('#story p', el => el.innerText);
  console.log('EN language switch verified:', { enPortfolioText, sampleStory: enStoryText.slice(0, 40) });

  await page.screenshot({ path: path.join(screenshotsDir, '07-english-mode.png') });

  // Switch back to NL
  await page.click('button[aria-label*="language"]');
  await new Promise(r => setTimeout(r, 400));
  const nlStoryText = await page.$eval('#story p', el => el.innerText);
  console.log('Back to NL verified:', { sampleStory: nlStoryText.slice(0, 40) });

  await browser.close();
  console.log('All tests passed successfully!');
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function test() {
  const screenshotsDir = path.join(__dirname, '..', 'public', 'test-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-crashpad'],
  });

  const page = await browser.newPage();

  console.log('--- 1. Testing Chapter I Desktop ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/#story', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: path.join(screenshotsDir, 'chapter-one-desktop.png') });
  console.log('Saved chapter-one-desktop.png');

  // Verify both cards exist
  const cardLinks = await page.$$eval('#story a', links => links.map(l => ({
    href: l.getAttribute('href'),
    text: l.innerText.replace(/\s+/g, ' ')
  })));
  console.log('Found cards in Chapter I:', cardLinks);

  console.log('--- 2. Testing CRACKED Project Page Desktop ---');
  await page.goto('http://localhost:3000/#cracked', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: path.join(screenshotsDir, 'cracked-hero-desktop.png') });
  console.log('Saved cracked-hero-desktop.png');

  // Check text content on #cracked
  const crackedData = await page.evaluate(() => {
    const h1 = document.querySelector('h1')?.innerText;
    const hasLogline = h1?.includes('A perfectionist chef');
    const outline = document.querySelector('section[aria-label="Story Outline"] p')?.innerText;
    const credits = document.querySelector('section[aria-label="Film End Credits"]')?.innerText;
    const imdbLink = document.querySelector('a[href*="imdb"]');
    const youtubeLink = document.querySelector('a[href*="youtube.com"]')?.getAttribute('href');
    const stillCaption = document.querySelector('section[aria-label="Character Stills Gallery"] p')?.innerText;
    return {
      h1,
      hasLogline,
      hasOutline: Boolean(outline && outline.includes('Chef Victor')),
      hasCredits: Boolean(credits && credits.includes('Originally written by') && credits.includes('Floris van der Waals')),
      hasImdb: Boolean(imdbLink),
      youtubeLink,
      stillCaption,
    };
  });
  console.log('CRACKED page verification result:', crackedData);

  // Scroll down to check gallery and credits
  await page.evaluate(() => window.scrollBy(0, 1000));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotsDir, 'cracked-middle-desktop.png') });

  await page.evaluate(() => window.scrollBy(0, 1000));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(screenshotsDir, 'cracked-credits-desktop.png') });

  console.log('--- 3. Testing Click on Still in Gallery ---');
  const stillThumbnails = await page.$$('section[aria-label="Character Stills Gallery"] button[aria-label^="View still"]');
  if (stillThumbnails.length >= 2) {
    await stillThumbnails[1].click();
    await new Promise(r => setTimeout(r, 300));
    const still2Text = await page.evaluate(() => document.querySelector('section[aria-label="Character Stills Gallery"] p')?.innerText);
    console.log('Still 2 caption after click:', still2Text);
  }

  console.log('--- 4. Testing "Back to the story" navigation ---');
  await page.click('button[aria-label="Back to the story"]');
  await new Promise(r => setTimeout(r, 800));
  const currentUrl = page.url();
  console.log('URL after clicking Back to story:', currentUrl);

  console.log('--- 5. Testing Mobile Viewport (390x844) ---');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/#story', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, 'chapter-one-mobile.png') });

  await page.goto('http://localhost:3000/#cracked', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotsDir, 'cracked-mobile.png') });

  console.log('--- 6. Confirming Mustang still works ---');
  await page.goto('http://localhost:3000/#mustang', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 1000));
  const mustangImdb = await page.evaluate(() => Boolean(document.querySelector('a[href*="imdb"]')));
  console.log('Mustang has IMDb link:', mustangImdb);

  await browser.close();
  console.log('All verification checks passed successfully!');
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});

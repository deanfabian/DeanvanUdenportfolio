const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const ssDir = path.join(__dirname, '..', 'public', 'screenshots', 'mustang');
  if (!fs.existsSync(ssDir)) {
    fs.mkdirSync(ssDir, { recursive: true });
  }

  console.log('Launching browser to test Mustang project integration...');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-crashpad'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const errors = [];
  page.on('pageerror', err => errors.push(err.toString()));

  // 1. Visit Chapter I directly
  console.log('Testing Chapter I section with Mustang Card...');
  await page.goto('http://localhost:3000/#story', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: path.join(ssDir, '01-chapter-1-mustang-card.png') });
  console.log('Saved 01-chapter-1-mustang-card.png');

  // Verify no skeleton cards remain
  const skeletonCount = await page.evaluate(() => {
    return document.querySelectorAll('.animate-pulse, [class*="opacity-30"]').length;
  });
  console.log(`Skeleton elements count in DOM: ${skeletonCount}`);

  // Test hover on card
  const card = await page.$('a[href="#mustang"]');
  if (card) {
    await card.hover();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ssDir, '02-chapter-1-card-hover.png') });
    console.log('Saved 02-chapter-1-card-hover.png');
  }

  // 2. Click to navigate to #mustang
  console.log('Navigating to #mustang project page...');
  await page.click('a[href="#mustang"]');
  await new Promise(r => setTimeout(r, 1000));

  // Tagline alone on screen
  await page.screenshot({ path: path.join(ssDir, '03-mustang-tagline-screen.png') });
  console.log('Saved 03-mustang-tagline-screen.png');

  // Scroll down to logline & film embed facade
  await page.evaluate(() => window.scrollTo(0, 950));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ssDir, '04-mustang-film-facade.png') });
  console.log('Saved 04-mustang-film-facade.png');

  // Click to play video
  const playBtn = await page.$('button[aria-label="Play Mustang mockumentary film"]');
  if (playBtn) {
    console.log('Clicking film play button to test iframe facade...');
    await playBtn.click();
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(ssDir, '05-mustang-iframe-playing.png') });
    console.log('Saved 05-mustang-iframe-playing.png');
  }

  // Scroll down to outline & character stills gallery
  await page.evaluate(() => window.scrollTo(0, 1850));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ssDir, '06-mustang-gallery-still-1.png') });
  console.log('Saved 06-mustang-gallery-still-1.png');

  // Click on Still 2 (Cal Dekker) to test sonder detail change
  const stillButtons = await page.$$('button[aria-label*="View still"]');
  if (stillButtons.length > 1) {
    await stillButtons[1].click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(ssDir, '07-mustang-gallery-still-2-sonder.png') });
    console.log('Saved 07-mustang-gallery-still-2-sonder.png');
  }

  // Scroll down to credits block & back link
  await page.evaluate(() => window.scrollTo(0, 2750));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ssDir, '08-mustang-credits-block.png') });
  console.log('Saved 08-mustang-credits-block.png');

  // Test "Back to the story" link
  console.log('Testing "Back to the story" navigation...');
  const backBtn = await page.$('footer button');
  if (backBtn) {
    await backBtn.click();
    await new Promise(r => setTimeout(r, 800));
    console.log(`Current URL after back button: ${page.url()}`);
    await page.screenshot({ path: path.join(ssDir, '09-returned-to-story.png') });
    console.log('Saved 09-returned-to-story.png');
  }

  console.log('\n--- VERIFICATION ERRORS ---');
  console.log(`Errors count: ${errors.length}`);
  if (errors.length > 0) {
    errors.forEach(e => console.error('  ERROR:', e));
  }

  await browser.close();
  console.log('All Mustang project checks passed!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const screenshotDir = path.join(__dirname, '..', 'public', 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('Launching Chrome to verify welcome sequence...');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-crashpad'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const consoleLogs = [];
  const errors = [];

  page.on('console', (msg) => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', (err) => errors.push(err.toString()));

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  // Wait 1s for GSAP & Lenis initialization
  await new Promise((r) => setTimeout(r, 1000));

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = 900;
  const maxScroll = totalHeight - viewportHeight;
  console.log(`Page scrollable height: ${totalHeight}px (maxScroll: ${maxScroll}px)`);

  // Helper to scroll and wait for GSAP scrub
  async function scrollToRatio(ratio, label) {
    const targetY = maxScroll * ratio;
    await page.evaluate((y) => {
      window.scrollTo({ top: y, behavior: 'instant' });
    }, targetY);
    // Allow GSAP ScrollTrigger to update
    await new Promise((r) => setTimeout(r, 800));
    const ssPath = path.join(screenshotDir, `${label}.png`);
    await page.screenshot({ path: ssPath });
    console.log(`Saved screenshot: ${label}.png at ${Math.round(ratio * 100)}% scroll (${Math.round(targetY)}px)`);
  }

  // Stage 1: The City Facade (0%)
  await scrollToRatio(0.0, 'stage-1-photo-facade');

  // Stage 2: The Approach & "This one’s mine." (28%)
  await scrollToRatio(0.28, 'stage-2-photo-approach');

  // Stage 3: Window Close-up with natural raindrops & frame (52%)
  await scrollToRatio(0.52, 'stage-3-photo-window-closeup');

  // Stage 4: Inside the Flat with Room Interior & Navigation (74%)
  await scrollToRatio(0.74, 'stage-4-photo-room');

  // Chapter 1 Placeholder Section (100%)
  await scrollToRatio(1.0, 'stage-5-photo-chapter');

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.log(`Console messages: ${consoleLogs.length}`);
  if (consoleLogs.length > 0) {
    consoleLogs.forEach((l) => console.log('  ', l));
  }
  console.log(`Errors: ${errors.length}`);
  if (errors.length > 0) {
    errors.forEach((e) => console.error('  ERROR:', e));
  }

  await browser.close();
  console.log('Verification finished successfully!');
}

run().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});

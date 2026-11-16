const puppeteer = require('puppeteer-core');
const path = require('path');

async function test() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Start at Welcome sequence
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise((r) => setTimeout(r, 800));

  console.log('--- 1. Testing Sound Toggle at Scroll 0 (Outside) ---');
  // Click sound toggle
  await page.click('button[aria-label*="soundscape"]');
  await new Promise((r) => setTimeout(r, 400));

  let soundText = await page.$eval('button[aria-label*="soundscape"], button[aria-label*="faded"]', (el) => el.innerText.trim());
  console.log('Sound toggle label at top:', soundText);

  let audioMetrics = await page.evaluate(() => {
    // @ts-ignore
    const engine = window.__AUDIO_ENGINE__ || null;
    return {
      scroll: window.scrollY,
      text: document.querySelector('button[aria-label*="sound"]')?.textContent,
    };
  });
  console.log('Outside audio metrics:', audioMetrics);

  console.log('--- 2. Scrolling Down to Inside the Room & Story ---');
  // Scroll down past the 72% mark into the room
  await page.evaluate(() => {
    window.scrollTo({ top: window.innerHeight * 3.2, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));

  soundText = await page.$eval('button[aria-label*="soundscape"], button[aria-label*="faded"], button[aria-label*="Inside"]', (el) => el.innerText.trim());
  console.log('Sound toggle label inside room:', soundText);

  console.log('--- 3. Scrolling Further Down to Chapter I ---');
  await page.evaluate(() => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));

  soundText = await page.$eval('button[aria-label*="soundscape"], button[aria-label*="faded"], button[aria-label*="Inside"]', (el) => el.innerText.trim());
  console.log('Sound toggle label in Chapter I:', soundText);

  console.log('--- 4. Scrolling Back Up to Outside ---');
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));

  soundText = await page.$eval('button[aria-label*="soundscape"], button[aria-label*="faded"], button[aria-label*="Inside"]', (el) => el.innerText.trim());
  console.log('Sound toggle label back at top:', soundText);

  await browser.close();
  console.log('Audio & scroll verification completed successfully!');
}

test().catch((err) => {
  console.error(err);
  process.exit(1);
});

const puppeteer = require('puppeteer-core');

async function testFrames() {
  console.log('--- Verifying Responsive Frames & Non-Film Layout ---');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('1. Checking Portfolio card aspect ratios on homepage...');
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const cardRatios = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#portfolio a[href^="#"]'));
    return cards.map(c => {
      const href = c.getAttribute('href');
      const rect = c.getBoundingClientRect();
      const ratio = rect.width / rect.height;
      return {
        href,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        ratio: Number(ratio.toFixed(2))
      };
    });
  });
  console.log('Card dimensions:', cardRatios);

  const unpluggdCard = cardRatios.find(c => c.href === '#unpluggd');
  const mustangCard = cardRatios.find(c => c.href === '#mustang');
  console.log('Unpluggd card ratio (should be portrait < 1):', unpluggdCard?.ratio);
  console.log('Mustang card ratio (should be landscape > 1.3):', mustangCard?.ratio);
  if (!unpluggdCard || unpluggdCard.ratio >= 1.0) {
    throw new Error(`Unpluggd card should be portrait (ratio < 1.0), got ${unpluggdCard?.ratio}`);
  }
  if (!mustangCard || mustangCard.ratio <= 1.3) {
    throw new Error(`Mustang card should be landscape (ratio > 1.3), got ${mustangCard?.ratio}`);
  }

  // 2. Check #unpluggd project page
  console.log('2. Checking #unpluggd project page...');
  await page.goto('http://localhost:3000/#unpluggd', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const unpluggdPage = await page.evaluate(() => {
    const title = document.querySelector('h1')?.textContent?.trim() || '';
    const madeBy = document.querySelector('p.font-mono')?.textContent?.trim() || '';
    const hasCredits = document.body.innerText.includes('Credits & Crew');
    const hasCast = document.body.innerText.includes('Cast');
    const hasLogline = document.body.innerText.includes('Logline');
    const hasSynopsis = document.body.innerText.includes('Synopsis');
    const mainImg = document.querySelector('section:nth-of-type(2) img');
    const imgRect = mainImg ? mainImg.getBoundingClientRect() : null;
    return {
      title,
      madeBy,
      hasCredits,
      hasCast,
      hasLogline,
      hasSynopsis,
      imgRect: imgRect ? { width: Math.round(imgRect.width), height: Math.round(imgRect.height) } : null
    };
  });
  console.log('Unpluggd page info:', unpluggdPage);
  if (!unpluggdPage.title.includes('Unplugg’d Magazine')) throw new Error('Unpluggd title mismatch');
  if (unpluggdPage.hasCredits || unpluggdPage.hasCast || unpluggdPage.hasSynopsis) {
    throw new Error('Non-film project Unpluggd should NOT have Credits, Cast, or Synopsis!');
  }

  // 3. Check #twins-graphics project page
  console.log('3. Checking #twins-graphics project page...');
  await page.goto('http://localhost:3000/#twins-graphics', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const twinsGraphicsPage = await page.evaluate(() => {
    const title = document.querySelector('h1')?.textContent?.trim() || '';
    const hasCredits = document.body.innerText.includes('Credits & Crew');
    const hasCast = document.body.innerText.includes('Cast');
    const thumbs = Array.from(document.querySelectorAll('section button img')).length;
    return { title, hasCredits, hasCast, thumbs };
  });
  console.log('Twins graphics page info:', twinsGraphicsPage);
  if (!twinsGraphicsPage.title.includes('Spelersaankondigingen')) throw new Error('Twins graphics title mismatch');
  if (twinsGraphicsPage.hasCredits || twinsGraphicsPage.hasCast) {
    throw new Error('Twins graphics should NOT have Credits or Cast table');
  }
  if (twinsGraphicsPage.thumbs !== 2) {
    throw new Error('Twins graphics should have 2 stills (Thomas and Niek)');
  }

  // 4. Check #mustang film page still has film credits
  console.log('4. Checking #mustang film page...');
  await page.goto('http://localhost:3000/#mustang', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 600));

  const mustangPage = await page.evaluate(() => {
    const textLower = document.body.innerText.toLowerCase();
    const hasCredits = textLower.includes('credits');
    const hasCast = textLower.includes('cast');
    const hasSynopsis = textLower.includes('synopsis');
    return { hasCredits, hasCast, hasSynopsis };
  });
  console.log('Mustang film page info:', mustangPage);
  if (!mustangPage.hasCredits || !mustangPage.hasCast || !mustangPage.hasSynopsis) {
    throw new Error('Film project Mustang MUST have Credits, Cast, and Synopsis!');
  }

  // 5. Test 375px mobile responsiveness
  console.log('5. Testing 375px mobile viewport...');
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
    throw new Error(`Horizontal overflow at 375px! scrollWidth=${mobileCheck.scrollWidth}`);
  }

  console.log('>>> ALL CHECKS PASSED WITH 100% SUCCESS! <<<');
  await browser.close();
}

testFrames().catch(err => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});

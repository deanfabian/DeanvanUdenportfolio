const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const assetDir = path.join(__dirname, '..', 'public', 'assets', 'projects', 'mustang');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-crashpad'],
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  
  // Create an animated canvas in browser, record 2 seconds via MediaRecorder, output WebM
  const base64Video = await page.evaluate(async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');

    // Load hero image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/projects/mustang/hero.jpg';
    await new Promise(r => img.onload = r);

    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);

    recorder.start();

    const start = performance.now();
    await new Promise(resolve => {
      function draw(now) {
        const elapsed = (now - start) / 1000;
        ctx.clearRect(0, 0, 640, 360);

        // Steady cinematic film frame without bouncing/scaling
        ctx.drawImage(img, 0, 0, 640, 360);

        // Very gentle film grain texture
        const flicker = 0.98 + 0.02 * Math.random();
        ctx.fillStyle = `rgba(255, 255, 255, ${0.015 * flicker})`;
        for (let i = 0; i < 360; i += 6) {
          ctx.fillRect(0, i, 640, 1);
        }

        if (elapsed < 2.0) {
          requestAnimationFrame(draw);
        } else {
          recorder.stop();
        }
      }
      requestAnimationFrame(draw);
      recorder.onstop = resolve;
    });

    const blob = new Blob(chunks, { type: 'video/webm' });
    const reader = new FileReader();
    return new Promise(resolve => {
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(blob);
    });
  });

  const buffer = Buffer.from(base64Video, 'base64');
  fs.writeFileSync(path.join(assetDir, 'preview.webm'), buffer);
  // Also save as preview.mp4 for convenience
  fs.writeFileSync(path.join(assetDir, 'preview.mp4'), buffer);
  console.log('Generated preview.webm & preview.mp4 successfully, size:', buffer.length, 'bytes');

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

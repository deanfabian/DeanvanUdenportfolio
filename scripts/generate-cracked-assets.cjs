const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const assetDir = path.join(__dirname, '..', 'public', 'assets', 'projects', 'cracked');
  if (!fs.existsSync(assetDir)) {
    fs.mkdirSync(assetDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-crashpad'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

  const stills = [
    {
      filename: 'still-1.jpg',
      title: 'Victor, mid-twenties',
      subtitle: 'Chef de Cuisine · Flawless Culinary Creations',
      note: 'Raised in a family of high achievers.',
      bgGrad: 'linear-gradient(135deg, #120e0a 0%, #241910 50%, #0d0a07 100%)',
      accentColor: '#fbbf24',
      badge: 'CULINARY CURSE',
      icon: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><path d="M12 2a5 8 0 0 0-5 8c0 4 3 6 5 6s5-2 5-6a5 8 0 0 0-5-8z"/></svg>`
    },
    {
      filename: 'still-2.jpg',
      title: 'Elena',
      subtitle: 'Photographer · The Kitchen Studio',
      note: 'Raised to see failure as growth.',
      bgGrad: 'linear-gradient(135deg, #0e1215 0%, #15222c 50%, #0a0e12 100%)',
      accentColor: '#38bdf8',
      badge: 'LENS PERSPECTIVE',
      icon: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`
    },
    {
      filename: 'still-3.jpg',
      title: 'The Presenter',
      subtitle: 'Live Culinary Championship Host · Prime Time Broadcast',
      note: 'Used to be a chef himself.',
      bgGrad: 'linear-gradient(135deg, #180d18 0%, #2d142d 50%, #110811 100%)',
      accentColor: '#e879f9',
      badge: 'LIVE BROADCAST',
      icon: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e879f9" stroke-width="1.2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`
    }
  ];

  for (const s of stills) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,300;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 1280px;
            height: 720px;
            background: ${s.bgGrad};
            font-family: 'Inter', sans-serif;
            color: #f8fafc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 56px 64px;
            position: relative;
            overflow: hidden;
          }
          .film-overlay {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 60% 40%, rgba(255,255,255,0.03) 0%, transparent 70%),
                        linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%);
            pointer-events: none;
          }
          .grain {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 0);
            background-size: 3px 3px;
            opacity: 0.35;
          }
          .timecode {
            font-family: monospace;
            font-size: 13px;
            letter-spacing: 0.25em;
            color: #64748b;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .rec-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ef4444;
          }
          .badge {
            font-family: monospace;
            font-size: 11px;
            letter-spacing: 0.2em;
            color: ${s.accentColor};
            border: 1px solid ${s.accentColor}40;
            padding: 4px 10px;
            border-radius: 4px;
            background: ${s.accentColor}10;
          }
          .center-art {
            position: absolute;
            right: 80px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0.45;
          }
          .content {
            position: relative;
            z-index: 2;
            max-width: 780px;
          }
          .project-tag {
            font-size: 13px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: ${s.accentColor};
            margin-bottom: 16px;
            font-weight: 500;
          }
          h1 {
            font-family: 'Fraunces', serif;
            font-size: 52px;
            font-weight: 400;
            line-height: 1.15;
            color: #ffffff;
            margin-bottom: 16px;
            letter-spacing: -0.01em;
          }
          p.sub {
            font-size: 18px;
            color: #94a3b8;
            font-weight: 300;
            line-height: 1.5;
            margin-bottom: 24px;
          }
          .meta-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(148, 163, 184, 0.2);
            padding: 8px 16px;
            border-radius: 9999px;
            font-size: 13px;
            color: #cbd5e1;
            font-family: 'Fraunces', serif;
            font-style: italic;
          }
          .footer-bar {
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(255,255,255,0.08);
            padding-top: 20px;
            font-size: 12px;
            color: #64748b;
            letter-spacing: 0.15em;
          }
        </style>
      </head>
      <body>
        <div class="film-overlay"></div>
        <div class="grain"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2;">
          <div class="timecode">
            <span class="rec-dot"></span>
            <span>CRACKED // 24.00 FPS · 4K</span>
          </div>
          <span class="badge">${s.badge}</span>
        </div>

        <div class="center-art">${s.icon}</div>

        <div class="content">
          <div class="project-tag">Cannet Chews Productions</div>
          <h1>${s.title}</h1>
          <p class="sub">${s.subtitle}</p>
          <div class="meta-pill">
            <span>“${s.note}”</span>
          </div>
        </div>

        <div class="footer-bar">
          <span>DIR. GILDE BUGAITYTE · EXEC PROD. DEAN VAN UDEN</span>
          <span>SCENE STILL · BUAS 2025</span>
        </div>
      </body>
      </html>
    `;
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    const outPath = path.join(assetDir, s.filename);
    await page.screenshot({ path: outPath, quality: 90, type: 'jpeg' });
    console.log(`Generated ${s.filename}`);
  }

  // Generate preview loop video (steady, no bouncing)
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  const base64Video = await page.evaluate(async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/projects/cracked/hero.jpg';
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

        // Steady cinematic film frame without bouncing
        ctx.drawImage(img, 0, 0, 640, 360);

        // Very gentle film grain
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
  fs.writeFileSync(path.join(assetDir, 'preview.mp4'), buffer);
  console.log('Generated CRACKED preview.webm & preview.mp4 successfully, size:', buffer.length, 'bytes');

  await browser.close();
  console.log('All CRACKED assets generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

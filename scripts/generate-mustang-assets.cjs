const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const assetDir = path.join(__dirname, '..', 'public', 'assets', 'projects', 'mustang');
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
      title: 'Erik Dekker, 50',
      subtitle: 'Head Trainer & Father · Ruitersportcentrum Breda',
      note: 'Laminated training schedule in hand',
      bgGrad: 'linear-gradient(135deg, #090e18 0%, #151d2e 50%, #0d121c 100%)',
      accentColor: '#fbbf24',
      badge: 'ARCHIVAL // 2026',
      icon: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>`
    },
    {
      filename: 'still-2.jpg',
      title: 'Cal "The Mustang" Dekker',
      subtitle: 'Main Character & Self-Declared Champion · Finland World Cup Qualifier',
      note: 'Pre-race inhaler ritual',
      bgGrad: 'linear-gradient(135deg, #180d0d 0%, #2e1518 50%, #12090a 100%)',
      accentColor: '#f87171',
      badge: 'DOCU-INTERVIEW',
      icon: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="1.2"><path d="M12 2a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`
    },
    {
      filename: 'still-3.jpg',
      title: 'Gallus Maximus',
      subtitle: 'Stick Horse · Grade A Thoroughbred Wood & Felt',
      note: 'Stable chambers · Classical playlist',
      bgGrad: 'linear-gradient(135deg, #0b1510 0%, #14281e 50%, #08110c 100%)',
      accentColor: '#34d399',
      badge: 'STABLE FOOTAGE',
      icon: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="1.2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="1"/></svg>`
    },
    {
      filename: 'still-4.jpg',
      title: 'Julia Al-Mamoet, 13',
      subtitle: 'The Next Generation · Junior Circuit Breda',
      note: 'Steeplechase hurdles warmup',
      bgGrad: 'linear-gradient(135deg, #100f1c 0%, #1c1a32 50%, #0a0913 100%)',
      accentColor: '#a78bfa',
      badge: 'COMPETITION CAM',
      icon: `<svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="1.2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
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
          /* Cinematic Letterbox effect */
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
            <span>MUSTANG // 24.00 FPS · 4K LOG</span>
          </div>
          <span class="badge">${s.badge}</span>
        </div>

        <div class="center-art">${s.icon}</div>

        <div class="content">
          <div class="project-tag">A Mockumentary by KennethChews</div>
          <h1>${s.title}</h1>
          <p class="sub">${s.subtitle}</p>
          <div class="meta-pill">
            <span>“${s.note}”</span>
          </div>
        </div>

        <div class="footer-bar">
          <span>DIR. FAYE VAN CALCK · PROD. DEAN VAN UDEN</span>
          <span>SCENE STILL · BUAS 2026</span>
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

  await browser.close();
  console.log('All still assets generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

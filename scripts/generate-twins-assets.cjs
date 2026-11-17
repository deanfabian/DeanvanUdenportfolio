const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const assetDir = path.join(__dirname, '..', 'public', 'assets', 'projects', 'twins');
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

  const scenes = [
    {
      filename: 'hero.jpg',
      badge: 'MATCHDAY CONTENT',
      tag: 'Brabant Twins Baseball',
      title: 'Brabant Twins',
      subtitle: 'Social Media & Matchday Visuals · Oosterhout',
      note: 'Capturing the momentum, grit and community of European baseball.',
      accent: '#38bdf8',
      bgGrad: 'linear-gradient(135deg, #070d18 0%, #0c1a2e 50%, #050811 100%)',
      meta: 'CONTENT STRATEGY · VISUAL BRANDING · REELS'
    },
    {
      filename: 'still-1.jpg',
      badge: 'GAME DAY ASSETS',
      tag: 'Visual Identity',
      title: 'Matchday Line-ups & Stories',
      subtitle: 'Dynamic social templates designed for high-impact instant publishing.',
      note: 'Speed of publication matters as much as the framing.',
      accent: '#38bdf8',
      bgGrad: 'linear-gradient(135deg, #091220 0%, #11223b 50%, #070c16 100%)',
      meta: 'INSTAGRAM REELS · STORIES · FEED GRAPHICS'
    },
    {
      filename: 'still-2.jpg',
      badge: 'SPORTS PHOTOGRAPHY',
      tag: 'Fieldside Action',
      title: 'Diamond Intensity',
      subtitle: 'Pitch mechanics, dugout focus, and game-winning celebration frames.',
      note: 'The story is in the breath before the delivery.',
      accent: '#fbbf24',
      bgGrad: 'linear-gradient(135deg, #181308 0%, #2b220d 50%, #0f0c05 100%)',
      meta: 'RAW EMOTION · GAME MOMENTUM · OOSTERHOUT'
    },
    {
      filename: 'still-3.jpg',
      badge: 'COMMUNITY & CULTURE',
      tag: 'Club Culture',
      title: 'Next Generation Twins',
      subtitle: 'Youth clinics, team spirit, and club culture behind the scoreboard.',
      note: 'Building an audience around genuine passion.',
      accent: '#34d399',
      bgGrad: 'linear-gradient(135deg, #081610 0%, #0f2b20 50%, #050d0a 100%)',
      meta: 'COMMUNITY STORYTELLING · YOUTH CLINICS'
    }
  ];

  for (const s of scenes) {
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
            background: radial-gradient(circle at 65% 45%, rgba(56,189,248,0.06) 0%, transparent 65%),
                        linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.7) 100%);
            pointer-events: none;
          }
          .diamond-grid {
            position: absolute;
            right: 80px;
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
            width: 320px;
            height: 320px;
            border: 2px solid ${s.accent}25;
            pointer-events: none;
          }
          .diamond-inner {
            position: absolute;
            inset: 40px;
            border: 1px dashed ${s.accent}20;
          }
          .timecode {
            font-family: monospace;
            font-size: 13px;
            letter-spacing: 0.25em;
            color: #94a3b8;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .badge {
            font-family: monospace;
            font-size: 11px;
            letter-spacing: 0.2em;
            color: ${s.accent};
            border: 1px solid ${s.accent}40;
            padding: 5px 12px;
            border-radius: 4px;
            background: ${s.accent}12;
          }
          .content {
            position: relative;
            z-index: 2;
            max-width: 820px;
          }
          .project-tag {
            font-size: 13px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: ${s.accent};
            margin-bottom: 16px;
            font-weight: 500;
          }
          h1 {
            font-family: 'Fraunces', serif;
            font-size: 54px;
            font-weight: 400;
            line-height: 1.15;
            color: #ffffff;
            margin-bottom: 16px;
            letter-spacing: -0.01em;
          }
          p.sub {
            font-size: 20px;
            color: #cbd5e1;
            font-weight: 300;
            line-height: 1.5;
            margin-bottom: 24px;
          }
          .meta-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(148, 163, 184, 0.25);
            padding: 8px 18px;
            border-radius: 9999px;
            font-size: 14px;
            color: #e2e8f0;
            font-family: 'Fraunces', serif;
            font-style: italic;
          }
          .footer-bar {
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 20px;
            font-size: 12px;
            color: #94a3b8;
            letter-spacing: 0.15em;
          }
        </style>
      </head>
      <body>
        <div class="film-overlay"></div>
        <div class="diamond-grid"><div class="diamond-inner"></div></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2;">
          <div class="timecode">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: ${s.accent};"></span>
            <span>BRABANT TWINS // CONTENT CASE STUDY</span>
          </div>
          <span class="badge">${s.badge}</span>
        </div>

        <div class="content">
          <div class="project-tag">${s.tag}</div>
          <h1>${s.title}</h1>
          <p class="sub">${s.subtitle}</p>
          <div class="meta-pill">
            <span>“${s.note}”</span>
          </div>
        </div>

        <div class="footer-bar">
          <span>${s.meta}</span>
          <span>OOSTERHOUT · 2024–HEDEN</span>
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

  // Generate preview loop video (steady, no bounce)
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  const base64Video = await page.evaluate(async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/projects/twins/hero.jpg';
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

        ctx.drawImage(img, 0, 0, 640, 360);

        // Subtle film grain
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
  console.log('Generated Brabant Twins preview.webm & preview.mp4 successfully');

  await browser.close();
  console.log('All Brabant Twins assets generated!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

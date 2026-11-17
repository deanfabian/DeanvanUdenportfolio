const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function run() {
  const assetDir = path.join(__dirname, '..', 'public', 'assets', 'projects', 'throwers-lab');
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
      badge: 'DEVELOPMENT PROGRAM',
      tag: 'Pitching Biomechanics & Media',
      title: 'The Throwers Lab',
      subtitle: 'Content, marketing en werving voor een ontwikkelingsprogramma voor werpers.',
      note: 'Biomechanica en werpersontwikkeling vertaald naar beeld.',
      accent: '#f59e0b',
      bgGrad: 'linear-gradient(135deg, #070b14 0%, #111827 50%, #050811 100%)',
      meta: 'CONTENT · MARKETING · WERVING · FINANCIËN'
    },
    {
      filename: 'still-1.jpg',
      badge: 'BIOMECHANICS ANALYSIS',
      tag: 'High-Speed Tracking',
      title: 'Throwing Mechanics',
      subtitle: 'Bewegingsanalyse en biomechanica van jonge werpers in beeld gebracht.',
      note: 'Precisie in beweging en dataverwerking.',
      accent: '#f59e0b',
      bgGrad: 'linear-gradient(135deg, #090e1a 0%, #172033 50%, #070b14 100%)',
      meta: 'ARM SPEED · KINEMATICS · VIDEO FEEDBACK'
    },
    {
      filename: 'still-2.jpg',
      badge: 'TRAINING SESSIONS',
      tag: 'Bullpen Practice',
      title: 'Bullpen & Pitch Design',
      subtitle: 'Gerichte trainingssessies, individuele werpbegeleiding en progressie.',
      note: 'Het traject van talent naar topsport.',
      accent: '#38bdf8',
      bgGrad: 'linear-gradient(135deg, #08111e 0%, #0e243d 50%, #050a12 100%)',
      meta: 'PITCH DESIGN · LAB SESSIONS · COACHING'
    },
    {
      filename: 'still-3.jpg',
      badge: 'RECRUITMENT & OUTREACH',
      tag: 'Talent Outreach',
      title: 'Talentenwerving & Programma',
      subtitle: 'Communicatie, content en werving voor de volgende generatie honkballers.',
      note: 'Jonge atleten en ouders betrekken bij het ontwikkeltraject.',
      accent: '#10b981',
      bgGrad: 'linear-gradient(135deg, #061410 0%, #0c2b22 50%, #040d0a 100%)',
      meta: 'COMMUNICATIE · WERVING · ORGANISATIE'
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
            background: radial-gradient(circle at 70% 40%, rgba(245,158,11,0.06) 0%, transparent 65%),
                        linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.7) 100%);
            pointer-events: none;
          }
          .tech-circle {
            position: absolute;
            right: 100px;
            top: 50%;
            transform: translateY(-50%);
            width: 340px;
            height: 340px;
            border: 2px solid ${s.accent}20;
            border-radius: 50%;
            pointer-events: none;
          }
          .tech-inner {
            position: absolute;
            inset: 40px;
            border: 1px dashed ${s.accent}25;
            border-radius: 50%;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 11px;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: #94a3b8;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 20px;
            z-index: 10;
          }
          .accent-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: ${s.accent};
            margin-right: 8px;
          }
          .center {
            z-index: 10;
            max-width: 820px;
          }
          .center h1 {
            font-family: 'Fraunces', serif;
            font-size: 56px;
            font-weight: 300;
            line-height: 1.15;
            color: #f8fafc;
            margin-bottom: 16px;
          }
          .center h2 {
            font-size: 18px;
            font-weight: 300;
            color: #cbd5e1;
            line-height: 1.5;
            margin-bottom: 12px;
          }
          .center p {
            font-family: 'Fraunces', serif;
            font-style: italic;
            font-size: 16px;
            color: ${s.accent};
          }
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #64748b;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 20px;
            z-index: 10;
          }
        </style>
      </head>
      <body>
        <div class="film-overlay"></div>
        <div class="tech-circle"><div class="tech-inner"></div></div>
        <div class="header">
          <div><span class="accent-dot"></span>${s.badge}</div>
          <div>${s.tag}</div>
        </div>
        <div class="center">
          <h1>${s.title}</h1>
          <h2>${s.subtitle}</h2>
          <p>${s.note}</p>
        </div>
        <div class="footer">
          <div>THE THROWERS LAB · DEVELOPMENT PROGRAM</div>
          <div>${s.meta}</div>
        </div>
      </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: path.join(assetDir, s.filename), quality: 90, type: 'jpeg' });
    console.log(`Generated ${s.filename}`);
  }

  // Copy or generate preview.webm / mp4 using simple canvas generator
  await page.evaluate(() => {
    document.body.innerHTML = '<canvas id="c" width="640" height="360"></canvas>';
  });

  const base64Video = await page.evaluate(async () => {
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8' });
    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);

    return new Promise(resolve => {
      recorder.start();
      const startTime = performance.now();

      function draw(now) {
        const elapsed = (now - startTime) / 1000;
        ctx.fillStyle = '#070b14';
        ctx.fillRect(0, 0, 640, 360);

        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(30, 30, 580, 300);

        ctx.fillStyle = '#f8fafc';
        ctx.font = '24px serif';
        ctx.fillText('The Throwers Lab', 50, 180);

        ctx.fillStyle = 'rgba(245, 158, 11, 0.8)';
        ctx.font = '12px monospace';
        ctx.fillText('DEVELOPMENT PROGRAM · MEDIA', 50, 210);

        if (elapsed < 2.0) {
          requestAnimationFrame(draw);
        } else {
          recorder.stop();
        }
      }
      requestAnimationFrame(draw);
      recorder.onstop = resolve;
    }).then(async () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      const reader = new FileReader();
      return new Promise(r => {
        reader.onloadend = () => r(reader.result.split(',')[1]);
        reader.readAsDataURL(blob);
      });
    });
  });

  const buffer = Buffer.from(base64Video, 'base64');
  fs.writeFileSync(path.join(assetDir, 'preview.webm'), buffer);
  fs.writeFileSync(path.join(assetDir, 'preview.mp4'), buffer);
  console.log('Generated preview.webm & preview.mp4 successfully');

  await browser.close();
  console.log('All Throwers Lab assets generated!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

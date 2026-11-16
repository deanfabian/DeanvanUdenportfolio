# Dean — Portfolio Welcome Experience: "The Window"

A cinematic, atmospheric personal portfolio welcome page for **Dean** (21-year-old Creative Business student, baseball pitcher & coach, and founder of a European baseball brand).

The experience is built around the unspoken realisation of *sonder* — that every passer-by lives a life as vivid and complex as your own. The site never defines or speaks the word; the visitor experiences it through motion, imagery, and restraint.

---

## 📽 The Welcome Sequence: "The Window"

A continuous, scroll-driven camera journey (~500vh) pinned inside a full-screen container with photographic crossfading:

1. **Stage 1 – The City Facade (0% – 20% scroll)**
   - High-resolution photographic night view across the street from a towering residential block (`/assets/scenes/facade.jpg`).
   - Dozens of lit windows containing varied human stories (two people dancing, someone on the phone, someone cooking, someone with plants, TV screens flickering) and passing traffic with motion-blurred headlights at the bottom.
   - Foreground depth canvas layer with subtle angled rain streaks and drifting bokeh discs.
   - Quiet typography: *"Dean"* in refined serif (*Fraunces*) and a tiny `"scroll"` cue.

2. **Stage 2 – The Approach & Crossfade 1 (20% – 50% scroll)**
   - Continuous camera push zooming directly toward Dean’s warm window (anchored at `62.2% X, 49.9% Y`).
   - Neighboring windows and lives momentarily sharpen and slide past the lens.
   - Mid-zoom whisper subtitle appears in an understated pill: *“This one’s mine.”*
   - Seamless crossfade from the facade into the window close-up layer (`/assets/scenes/window-closeup.jpg`).

3. **Stage 3 – Through the Glass (50% – 72% scroll)**
   - Window close-up fills the screen: brick exterior, window sill, real raindrops dripping down the glass pane, baseball glove on the shelf, and glowing desk lamp.
   - The camera continues pushing into the glass pane; soft specular light distortion clears, and the camera breaches the window threshold.

4. **Stage 4 – Inside the Flat (72% – 100% scroll)**
   - The camera arrives inside Dean's room (`/assets/scenes/room-interior.jpg`):
     - **Whiteboard**: Hand-drawn pitching sequence, mechanics, and tunneling notes.
     - **Desk**: Warm desk lamp glowing over Creative Business books, camera, sketches, post-its, and laptop.
     - **Gear**: Varsity team jacket draped over the chair; worn baseball glove and ball on the shelf.
     - **Rear Window**: The city night high-rise is visible over the shoulder through the room window — the outside world keeps moving.
   - Frosted corner navigation fades in: `Story · Work · Baseball · Contact`.
   - Final invitation cue appears: *“Come in.”* with an animated chevron guiding the visitor into the next chapter placeholder section below.

---

## 📁 Photographic Scene Layers

The photo layers are located in:
```
public/assets/scenes/
├── facade.jpg          # Full high-rise night facade with passing traffic
├── window-closeup.jpg  # Exterior window close-up with raindrops & baseball glove
└── room-interior.jpg   # Lived-in interior room with pitching board & desk
```

To update or replace any of the layers, drop your matching 16:9 images into `public/assets/scenes/`.

---

## 🛠 Tech Stack

- **Framework**: Vite + React 18 + TypeScript
- **Styling**: Tailwind CSS + custom design tokens
- **Animation**: GSAP + `ScrollTrigger`
- **Smooth Scroll**: Lenis (`lenis`)
- **Typography**: Google Fonts (*Fraunces* serif + *Inter* sans)
- **Sound**: Synthetic Web Audio API procedural soundscape (rain + city hum, muted by default)

---

## 🚀 Running the Project

```bash
# 1. Start the development server
npm run dev

# 2. Build for production
npm run build

# 3. Preview production build
npm run preview
```

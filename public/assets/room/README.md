# Room Assets Directory

This folder holds the assets for **Stage 4: Inside the Flat**.

## Swapping with Your Own Room Photo

To replace the vector room scene with your own high-resolution photograph:
1. Save your photograph as `photo.jpg` (or `room.jpg`) inside this directory: `public/assets/room/room.jpg`.
2. Recommended specs:
   - Resolution: `2560 x 1440` or `1920 x 1080` (16:9 ratio).
   - Format: JPG or WebP (under 500KB for rapid loading).
   - Mood: Warm, tungsten or desk lamp lighting at night, featuring your baseball gear, workspace, and creative project artifacts.
3. In `src/components/Room.tsx`, uncomment the `<img src="/assets/room/room.jpg" ... />` tag to overlay or replace the vector illustration.

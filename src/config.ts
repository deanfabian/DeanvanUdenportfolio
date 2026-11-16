// Portfolio Sequence & Animation Configuration
const BASE_URL = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';

export const assetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${BASE_URL}${path.replace(/^\//, '')}`;
};

export const CONFIG = {
  colors: {
    midnight: '#070b14',
    nightSky: '#0b1120',
    buildingCharcoal: '#0d1322',
    buildingShadow: '#080c16',
    windowOff: '#0b101c',
    tungsten: '#f59e0b',       // Warm 2700K lamp glow
    sodium: '#d97706',         // Deep street sodium amber
    tvCool: '#7dd3fc',         // Distant TV screen bluish flicker
    roomWarm: '#fef3c7',       // Soft incandescent reading lamp
    offWhite: '#f8fafc',
    textMuted: '#94a3b8',
    rainDrop: 'rgba(186, 230, 253, 0.45)',
    bokehAmber: 'rgba(245, 158, 11, 0.22)',
    bokehRed: 'rgba(239, 68, 68, 0.18)',
    bokehWhite: 'rgba(248, 250, 252, 0.25)',
  },
  typography: {
    serif: "'Fraunces', serif",
    sans: "'Inter', sans-serif",
  },
  camera: {
    // Zoom factor into the target window on the photographic facade
    zoomScale: 5.5,
    // Exact transform origin coordinates matching Dean's lit window in facade.jpg
    originX: 62.2,
    originY: 49.9,
    mobileOriginX: 62.2,
    mobileOriginY: 49.9,
  },
  stages: {
    // Stage 1: The City (0.00 - 0.20)
    cityIntroHold: 0.10,
    cityFadeOutText: 0.18,

    // Stage 2: The Approach & Facade Zoom (0.20 - 0.52)
    zoomStart: 0.20,
    zoomMidTextIn: 0.30,
    zoomMidTextHold: 0.38,
    zoomMidTextOut: 0.42,
    facadeToWindowCrossfade: 0.46,

    // Stage 3: Window Close-up & Through the Glass (0.50 - 0.76)
    windowCloseupHold: 0.54,
    glassDissolveStart: 0.62,
    glassDissolveEnd: 0.74,

    // Stage 4: Inside the Flat (0.74 - 1.00)
    roomFadeIn: 0.72,
    roomSettled: 0.82,
    navFadeIn: 0.88,
    comeInPrompt: 0.92,
  },
  assets: {
    facade: assetUrl('/assets/scenes/facade.jpg'),
    windowCloseup: assetUrl('/assets/scenes/window-closeup.jpg'),
    roomInterior: assetUrl('/assets/scenes/room-interior.jpg'),
  },
} as const;

export type Config = typeof CONFIG;

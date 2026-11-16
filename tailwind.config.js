/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: 'var(--color-midnight)',
        'night-sky': 'var(--color-night-sky)',
        'building-charcoal': 'var(--color-building-charcoal)',
        'building-shadow': 'var(--color-building-shadow)',
        'tungsten': 'var(--color-tungsten)',
        'sodium': 'var(--color-sodium)',
        'tv-cool': 'var(--color-tv-cool)',
        'room-warm': 'var(--color-room-warm)',
        'off-white': 'var(--color-off-white)',
        'text-muted': 'var(--color-text-muted)',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

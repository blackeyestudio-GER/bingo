import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
/** Aligned with Streamer Roulette — https://coolors.co/3aa1bd-586667-1c1e1e-111212-1e4545 */
export default {
  content: [
    './app/components/**/*.{vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.{vue,ts}',
    './app/app.vue',
  ],
  theme: {
    colors: {
      moonstone: '#3AA1BD',
      'dim-gray': '#869698',
      'eerie-black': '#1C1E1E',
      night: '#111212',
      'dark-slate-gray': '#1E4545',
      ...colors,
    },
    extend: {},
  },
  plugins: [],
}

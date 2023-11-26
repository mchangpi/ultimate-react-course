/** @type {import('tailwindcss').Config} */
/* https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js */
// eslint-disable-next-line
export default {
  content: ['./**/*.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    fontFamily: {
      /* override default fonts */
      sans: 'Roboto Mono, monospace',
    },
    extend: {
      // colors: { pizza: '#123456' },
      fontSize: {
        huge: ['10rem', { lineHeight: '1' }],
        height: {
          screen: '100dvh',
        },
      },
    },
  },
  plugins: [],
};

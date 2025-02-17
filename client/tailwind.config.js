/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ['Jost', 'serif'],
        logo: ['Pacifico', 'serif'],
        nav: ['Open Sans', 'serif'],
        inter: ['Inter', 'serif'],
      },
    },
  },
  plugins: [],
});

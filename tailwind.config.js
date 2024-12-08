/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#674636',
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        secondary: ['Exo', 'sans-serif'],
        heading: ['Elsie', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '9rem',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    // other plugins...
  ],
});
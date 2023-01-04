/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    minHeight: {
      "14": "3.5rem"
    },
    extend: {
      colors: {
        primary1: colors.blue[400],
        primary2: colors.purple[400],
      },
    },
  },
  plugins: [],
}

/* eslint-disable no-undef */
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: 'hsl(0, 0%, 22%)',
          DEFAULT: 'hsl(0, 0%, 20%)',
          dark: 'hsl(0, 0%, 18%)',
        },
        secondary: {
          light: colors.amber[400],
          DEFAULT: colors.amber[500],
          dark: colors.amber[600],
        },
        hover: 'hsla(0, 100%, 100%, 0.08)',
        background: 'hsl(0, 0%, 10%)',
        surface: 'hsl(0, 0%, 15%)',
        error: colors.red[600],
        on: {
          primary: 'hsl(0, 0%, 90%)',
          secondary: colors.black,
          bg: 'hsl(0, 0%, 80%)',
          surface: 'hsl(0, 0%, 90%)',
          error: 'hsl(0, 0%, 80%)',
        },
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
      boxShadow: ['active'],
      opacity: ['active'],
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}

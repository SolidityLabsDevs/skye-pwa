/** @type {import('tailwindcss').Config} */
/* eslint-disable */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './constants/classNames.ts',
    './pages/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        onNeutralBg: 'var(--onNeutralBg)',
        neutralBg: 'var(--neutralBg)',
        onPrimaryBg: 'var(--onPrimaryBg)',
        primaryBg: 'var(--primaryBg)',
        primary: 'var(--primary)',
        primaryForeground: 'var(--primaryForeground)',
        defaultText: 'var(--defaultText)',
        default: 'var(--default)'
      },
      animation: {
        slide: "slide 300ms ease-in-out",
        slideTop: "slideTop 300ms ease-in-out",
        slideBottom: "slideBottom 300ms ease-in-out",
        popup: "popup 0.25s ease-in-out",
        opacity: "opacity 0.25s ease-in-out",
        tilt: 'tilt 0.2s infinite linear',
        shake: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both',
        typing: "typing 2s steps(30), blink .7s infinite"
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        shake: {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)'
          },
          '20%, 80%': {
            transform: 'translate3d(2px, 0, 0)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)'
          },
          '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)'
          }
        },
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(0.5deg)',
          },
          '75%': {
            transform: 'rotate(-0.5deg)',
          },
        },
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slide: {
          "0%": { opacity: 0.3, transform: "translate(15%, 0px);" },
          "100%": { opacity: 1, transform: "translate(0);" },
        },
        popup: {
          "0%": { transform: "scale(0.8)", opacity: 0.8 },
          "50%": { transform: "scale(1.1)", opacity: 1 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        slideTop: {
          "0%": { opacity: 0.3, transform: "translate(0px, -15%);" },
          "100%": { opacity: 1, transform: "translate(0);" },
        },
        slideBottom: {
          "0%": { opacity: 0.3, transform: "translate(0px, 15%);" },
          "100%": { opacity: 1, transform: "translate(0);" },
        },
      },
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addVariant, addUtilities }) {
      addVariant('not-first', '&:not(:first-child)')
      addVariant('hocus', ['&:hover', '&:focus'])
      addUtilities({
        '.no-scrollbar': {
          'ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.font-thin': {
          fontWeight: 100,
          fontVariationSettings: '"wght" 100'
        },
        '.font-extralight': {
          fontWeight: 200,
          fontVariationSettings: '"wght" 200'
        },
        '.font-light': {
          fontWeight: 300,
          fontVariationSettings: '"wght" 300'
        },
        '.font-normal': {
          fontWeight: 400,
          fontVariationSettings: '"wght" 400'
        },
        '.font-medium': {
          fontWeight: 500,
          fontVariationSettings: '"wght" 500'
        },
        '.font-semibold': {
          fontWeight: 600,
          fontVariationSettings: '"wght" 600'
        },
        '.font-bold': {
          fontWeight: 700,
          fontVariationSettings: '"wght" 700'
        },
        '.font-extrabold': {
          fontWeight: 800,
          fontVariationSettings: '"wght" 800'
        },
        '.font-black': {
          fontWeight: 900,
          fontVariationSettings: '"wght" 900'
        }
      })
    }),
    require('tailwind-scrollbar')({ nocompatible: true, preferredStrategy: 'pseudoelements' }),
  ],
  variants: {
    scrollbar: ['rounded'],
  },
}

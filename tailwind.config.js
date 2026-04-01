/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'Manrope', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        hero: ['Bruno Ace SC', 'cursive'],
        ui: ['Julius Sans One', 'sans-serif'],
        accent: ['Langar', 'cursive'],
      },
      colors: {
        navy: {
          DEFAULT: '#001d51',
          light: '#002a6b',
          dark: '#00143a',
          900: '#000e29',
        },
        golden: {
          DEFAULT: '#ffe3a5',
          light: '#fff4dc',
          dark: '#f5c960',
          muted: '#c9a45c',
        },
        cream: '#fffdf7',
        'navy-900': '#0a0e27',
        'navy-800': '#0f1332',
        'golden-light': '#e8c547',
        'golden-dark': '#aa8c2c',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};

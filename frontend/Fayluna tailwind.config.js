// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  darkMode: 'class', // Enables toggling dark mode via a "dark" class on <html> or <body>
  theme: {
    extend: {
      colors: {
        // Custom purple gradient palette
        'purple-light': '#7c3aed',
        'purple': '#5b21b6',
        'purple-dark': '#3b0764',
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(to bottom right, #3b0764, #5b21b6, #7c3aed)',
        'purple-light-gradient': 'linear-gradient(to bottom right, #7c3aed, #a855f7)',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        purple: '0 4px 12px rgba(124, 58, 237, 0.4)',
      },
    },
  },
  plugins: [],
};

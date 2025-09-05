/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scans all JS/TS/JSX/TSX files inside src
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#7c3aed',
          50: '#f3f4f6',
          100: '#e5e7eb',
          200: '#d1d5db',
          300: '#9ca3af',
          400: '#6b7280',
          500: '#374151',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
    },
  },
  plugins: [],
};
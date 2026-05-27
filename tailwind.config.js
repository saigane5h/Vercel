/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        red: { DEFAULT: '#E31837', dark: '#B5122B', light: '#FF3355' },
        navy: { DEFAULT: '#1A1A2E', 800: '#16213E', 700: '#0F3460' },
        gray: { 50: '#F8F9FA', 100: '#F1F3F5', 200: '#E9ECEF', 400: '#ADB5BD', 600: '#6C757D' },
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

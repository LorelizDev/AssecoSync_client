/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Archivos dentro de src con las extensiones js, jsx, ts, tsx
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A3E0',
        hoverButton: '#31B8EA',
      },
      fontFamily: {
        mainFont: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

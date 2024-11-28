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
        font: '#1D1D1D',
        primarybg: '#F6FAFD',
        secondarybg: '#EEF6FB',
        grayicon: '#868686',
        darkicon: '#1D1D1D',
      },
      fontFamily: {
        mainFont: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgc: {
          dark: '#08090c',
          yellow: '#efbd4e',
          lime: '#00db78',
          card: '#15161a',
        }
      }
    },
  },
  plugins: [],
}

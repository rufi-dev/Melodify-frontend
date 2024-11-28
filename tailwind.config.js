/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle at center, #005700, #000000 70%)',
      },
      boxShadow: {
        '3xlgreen': '0px 15px 60px #00FF7F',
        '3xlred': '0px 15px 60px #ee404c',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customblue: {
          50: '#90dadd',
          100: '#7cc4c8'
        },
        customgrey: {
          50: '#a2b0b3'
        },
        customshade: {
          50: '#eddfca'
        }

      }
    },
  },
  plugins: [],
}
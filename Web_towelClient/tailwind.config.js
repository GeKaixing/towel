/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html",],
  theme: {
    extend: {
      borderRadius:{
        'my-rounded-10px': '10px',
      }
    },
 
  },
  plugins: [],
}


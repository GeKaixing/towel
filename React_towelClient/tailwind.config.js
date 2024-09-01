/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html",],
  theme: {
    extend: {
      borderRadius: {
        'my-rounded-10px': '10px',
      }
    }
  },
/* global require*/
  plugins: [
    import('@tailwindcss/typography'),
  ],
}


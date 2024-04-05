/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/components/**/*.html",
    "./src/app/pages/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#f57e00',
        'bg-black': '#191e1f',
        'btn-blue': '#3a86ff',
        'link-pink': '#ff69eb'
      }
    },
  },
  plugins: [],
}


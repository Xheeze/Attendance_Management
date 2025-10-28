/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // sleek blue
        secondary: '#f3f4f6', // light gray
        accent: '#10b981', // green for status
      }
    }
  },
  plugins: [],
}

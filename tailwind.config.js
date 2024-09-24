/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        slab: ["Roboto Slab", "serif"],
        roboto: ["Roboto", "sans-serif"],
      }
    },
  },
  plugins: [],
}


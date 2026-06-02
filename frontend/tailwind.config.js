/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E67E22',
        secondary: '#F4B183',
        background: '#FFF8F1',
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */

export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {

      colors: {
        primary: "#3b82f6",
        lightbg: "#f0f9ff",
        darkbg: "#0f172a"
      },

      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.08)"
      }

    },
  },

  plugins: [],
}
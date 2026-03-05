/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primary: "#2563eb",
      },

      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.05)",
      },

      borderRadius: {
        xl2: "18px",
      }

    },
  },
  plugins: [],
}
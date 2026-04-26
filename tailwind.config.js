/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        iron: {
          950: "#090807",
          900: "#12100e",
          850: "#1a1713",
          800: "#241f1a",
          700: "#332b23",
        },
        brass: {
          500: "#d19a45",
          400: "#e7b35b",
          300: "#f3cf8a",
        },
        ember: {
          600: "#b55322",
          500: "#d0632a",
          400: "#ea7a3a",
        },
        parchment: {
          100: "#f6ead4",
          200: "#ead6b5",
          300: "#cfb58d",
        },
      },
      boxShadow: {
        museum: "0 24px 80px rgba(0, 0, 0, 0.45)",
        brass: "0 0 0 1px rgba(209, 154, 69, 0.24), 0 18px 40px rgba(0, 0, 0, 0.35)",
      },
      fontFamily: {
        display: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E31E24",
          50: "#FEF2F2",
          100: "#FEE2E2",
          500: "#E31E24",
          600: "#DC2626",
          700: "#B91C1C",
        },
      },
    },
  },
  plugins: [],
};

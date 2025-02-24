/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Jingle: ["Jingle", "sans-serif"],
        Amsterline: ["Amsterline", "sans-serif"],
      },
    },
  },
  plugins: [],
};

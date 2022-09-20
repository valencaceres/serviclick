/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      general: {
        white: "#ffffff",
        black: "#000000",
        green: "#b9cb4a",
        blue: "#1b495b",
        gray: "#cccccc",
        darkGray: "#969696",
        lightGray: "#ededed",
        link: "#2454ff",
        focus: "#fdffe7",
      },
    },
    extend: {},
  },
  plugins: [],
};

import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
      },
      colors: {
        primary: {
          500: "#B4CD25",
        },
        "teal-blue": {
          DEFAULT: "#03495C",
          50: "#058F9F",
          100: "#058797",
          200: "#047688",
          300: "#04667A",
          400: "#03576B",
          500: "#03495C",
          600: "#033B4D",
          700: "#022E3E",
          800: "#022230",
          900: "#011721",
          950: "#011119",
        },
        "dusty-gray": {
          DEFAULT: "#959595",
          50: "#F1F1F1",
          100: "#E7E7E7",
          200: "#D2D2D2",
          300: "#BEBEBE",
          400: "#A9A9A9",
          500: "#959595",
          600: "#797979",
          700: "#5D5D5D",
          800: "#414141",
          900: "#252525",
          950: "#171717",
        },
        ultraLightGrey: "#ececec",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

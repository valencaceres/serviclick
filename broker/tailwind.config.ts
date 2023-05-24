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
          DEFAULT: "#B4CD25",
          50: "#E3EFA4",
          100: "#DFEC95",
          200: "#D6E677",
          300: "#CDE158",
          400: "#C3DB3A",
          500: "#B4CD25",
          600: "#A9C023",
          700: "#9DB320",
          800: "#92A61E",
          900: "#86991C",
          950: "#81931A",
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

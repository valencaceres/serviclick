import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#FF812C',
        'secondary': '#680D93',
        'font': '#5C5C5C',
        'gray-light': '#F3F4F6',
        'pink': '#C87BFF',
        'gray': '#D9D9D9',
        green: '#B4CD1B',
        black: '#222222',
        'black-blue': '#03495C'
      }
    },
  },
  plugins: [],
};
export default config;

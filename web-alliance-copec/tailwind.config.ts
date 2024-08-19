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
        "font-color": "#03495C",
        copec: "#1161CB",
        laiki: "#B4CD1B",
        secondary: "#E84155",
        "yellow-500": "#eab308",
        "some-green": "B4CD25",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
export default config;

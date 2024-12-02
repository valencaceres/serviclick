import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#0A1A4A',
        secondary: '#56E2E7',
        gray: '#F3F4F6',
        "very-gray": "#D9D9D9",
        green: '#B4CD1B',
        'blue-light': '#566590'
      },
    },
  },
  plugins: [],
} satisfies Config;

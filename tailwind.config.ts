import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Östafrikanskt tema – varma, inbjudande toner
        accent: {
          DEFAULT: "#b53a2e",
          light: "#d45a4a",
          dark: "#8b2c22",
        },
        warm: {
          50: "#fef9f6",
          100: "#fcf2eb",
          200: "#f8e4d4",
          300: "#f0c9a8",
          400: "#e5a06a",
          500: "#d97d3a",
          600: "#c46528",
        },
        earth: {
          DEFAULT: "#8b6914",
          light: "#a8841a",
          dark: "#6b5010",
        },
      },
      boxShadow: {
        soft: "0 4px 20px rgba(139, 105, 20, 0.08)",
        card: "0 2px 12px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;

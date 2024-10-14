import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        circularBold: ["var(--font-circular-bold)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pink: "#E83C6A",
        lightGreen: "#E6F5F0",
        offWhite: "#FBFBFB",
      },
    },
  },
  plugins: [],
};
export default config;

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
        circular: ["var(--font-circular)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pinkV: "#E83C6A",
        lightGreenV: "#E6F5F0",
        inputGreenV: "#B2D8D2",
        darkGreenV: "#078571",
        offWhiteV: "#FBFBFB",
        bodyText: "#222222",
        lightGrayV: "#535353",
        orangeV: "#F38B11",
      },
    },
  },
  plugins: [],
};
export default config;

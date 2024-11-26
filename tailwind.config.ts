import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        fullMinusNav: "calc(100vh - 6rem)",
      },
      boxShadow: {
        primary: "5px 5px 10px 0px rgba(0, 0, 0, 0.3)",
      },
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

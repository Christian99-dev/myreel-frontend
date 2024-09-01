import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/svg/*.svg",
  ],
  theme: {
    colors: {
      "pink-very-light": "#E8D2FF",
      "purple-light": "#A688FA",
      "purple": "#853BCE",
      "purple-dark": "#2D0B4F",

      "user-theme-1": "#2D8FF9",
      "user-theme-2": "#A688FA",
      "user-theme-3": "#FC7FDC",
      "user-theme-4": "#FF86AE",
      "user-theme-5": "#FFA581",
      "user-theme-6": "#FFCF66",

      "slot-theme-1": "#0082FB",
      "slot-theme-2": "#E525A9",
      "slot-theme-3": "#FF4C7D",
      "slot-theme-4": "#FF895A",
      "slot-theme-5": "#FFC44F",
      "slot-theme-6": "#F9F871",
      "slot-theme-7": "#00A78E",
    },
    screens: {
      "4xl": { min: "1921px" },
      "3xl": { max: "1921px" },
      "2xl": { max: "1536px" },
      xl: { max: "1380px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      xs: { max: "410px" },
    },
  },
  plugins: [],
};
export default config;

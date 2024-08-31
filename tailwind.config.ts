import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      pink_very_light: "#E8D2FF",
      purple_light: "#A688FA",
      purple: "#E8D2FF",
      purple_dark: "#E8D2FF",

      user_theme_1: "#2D8FF9",
      user_theme_2: "#A688FA",
      user_theme_3: "#FC7FDC",
      user_theme_4: "#FF86AE",
      user_theme_5: "#FFA581",
      user_theme_6: "#FFCF66",

      slot_theme_1: "#0082FB",
      slot_theme_2: "#E525A9",
      slot_theme_3: "#FF4C7D",
      slot_theme_4: "#FF895A",
      slot_theme_5: "#FFC44F",
      slot_theme_6: "#F9F871",
      slot_theme_7: "#00A78E",
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

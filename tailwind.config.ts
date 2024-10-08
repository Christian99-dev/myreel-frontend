import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/svg/*.svg",
  ],
  safelist: [

    {
      pattern: /(bg|text|stroke)-(pink-very-light|purple-light|purple|purple-dark)/,
      variants: ['hover', 'group-hover'],
    }
  ],
  theme: {
    colors: {
      "green": "#5BC236",

      "pink-very-light": "#E8D2FF",
      "purple-light": "#A688FA",
      "purple": "#853BCE",
      "purple-dark": "#2D0B4F",
      "purple-very-dark": "#20033D",

      "user-theme-1": "#2D8FF9",
      "user-theme-2": "#7d55ed",
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
    borderRadius: {
      "main" : "10px"
    },
    boxShadow: {
      'main': '0px 0px 6px 1px rgba(166, 136, 250, 0.7)',
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
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(10px)' },
        '50%': { transform: 'translateY(-10px)' },
      },
    },
    animation: {
      float: 'float 3s ease-in-out infinite',
    },
  },
  plugins: [],
};
export default config;

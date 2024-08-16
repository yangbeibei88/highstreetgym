/** @type {import('tailwindcss').Config} */
import settingScreens from "./tailwind.settings.screens.js";
import settingsFontSizes from "./tailwind.settings.fontSizes.js";

export default {
  content: ["../public/**/*.{html,js}"],
  theme: {
    screens: {
      xs: "475px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200",
      "2xl": "1400",
    },
    screen: settingScreens,
    fontSize: settingsFontSizes,
    extend: {
      colors: {
        midnightBlue: "#011640",
        cadetBlue: "#69AFBF",
        darkCyan: "#08403A",
        limeGreen: "#B0F222",
        lemonGreen: "#D9F21D",
      },
    },
  },
  plugins: [],
};

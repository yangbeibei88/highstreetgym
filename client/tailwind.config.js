/** @type {import('tailwindcss').Config} */
import settingScreens from "./tailwind.settings.screens.js";
import settingsFontSizes from "./tailwind.settings.fontSizes.js";

export default {
  content: ["../public/**/*.{html,js}"],
  theme: {
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

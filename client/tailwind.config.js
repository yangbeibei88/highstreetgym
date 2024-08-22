/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-import
import forms from "@tailwindcss/forms";
import settingScreens from "./tailwind.settings.screens.js";
import settingsFontSizes from "./tailwind.settings.fontSizes.js";

export default {
  content: [
    "../public/**/*.{html,js}",
    "./src/**/*.{js,ts}",
    "../views/**/*.pug",
  ],
  theme: {
    screens: {
      xs: "475px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
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
  plugins: [forms],
};

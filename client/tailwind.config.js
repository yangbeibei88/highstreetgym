/** @type {import('tailwindcss').Config} */
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-import
import forms from "@tailwindcss/forms";
import settingScreens from "./tailwind.settings.screens.js";
import settingsFontSizes from "./tailwind.settings.fontSizes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  content: [
    resolve(__dirname, "../public/**/*.html"),
    resolve(__dirname, "../public/**/*.js"),
    resolve(__dirname, "./src/**/*.{js,ts}"),
    resolve(__dirname, "../views/**/*.pug"),
    // "../public/**/*.html",
    // "../public/**/*.js",
    // "./src/**/*.{js,ts}",
    // "../views/**/*.pug",
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

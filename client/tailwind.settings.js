/**
 * Three `tailwind.settings.*.js` files are referenced from
 * https://davidhellmann.com/blog/development/tailwindcss-fluid-typography-with-css-clamp
 */

export default {
  typography: {
    fontSizeMin: 1,
    fontSizeMax: 1.25,
    msFactorMin: 1.125,
    msFactorMax: 1.2,
    lineHeight: 1.6,
  },
  screensRem: {
    min: 20,
    xs: 30,
    sm: 40,
    md: 48,
    lg: 64,
    xl: 80,
    "2xl": 96,
  },
  grid: {
    cols: 24,
  },
};

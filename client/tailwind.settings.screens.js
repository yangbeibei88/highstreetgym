import settings from "./tailwind.settings.js";

const remToPx = (rem) => `${rem * 16}px`;

export default {
  sm: remToPx(settings.screensRem.sm),
  md: remToPx(settings.screensRem.md),
  lg: remToPx(settings.screensRem.lg),
  xl: remToPx(settings.screensRem.xl),
  "2xl": remToPx(settings.screensRem["2xl"]),
};

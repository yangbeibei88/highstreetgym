import { check } from "express-validator";
import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import { parseDurationToSeconds } from "../utils/helpers.js";
import { getDayOptions } from "../models/ClassModel.js";

const { window } = new JSDOM("");
const purify = DOMPurify(window);
const strictSanitizeRules = {
  ALLOWED_TAGS: [],
  ALLOWED_ATTR: [],
};
const richtextSanitizeRules = {
  ALLOWED_TAGS: ["p", "b", "a", "br", "ul", "li", "ol", "strong", "em", "img"],
  FORBID_TAGS: ["script"],
  FORBID_ATTR: ["class"],
  FORBID_CONTENTS: ["script"],
  // RETURN_TRUSTED_TYPE: true,
};

export const classMappingConfig = {
  childElement: "class",
  fields: [
    { xmlElement: "classCode", dbField: "classCode", type: "integer" },
    { xmlElement: "className", dbField: "className", type: "string" },
    { xmlElement: "shortDesc", dbField: "shortDesc", type: "string" },
    { xmlElement: "longDesc", dbField: "longDesc", type: "richtext" },
    { xmlElement: "imageCover", dbField: "imageCover", type: "string" },
    { xmlElement: "minDuration", dbField: "minDuration", type: "duration" },
    { xmlElement: "maxDuration", dbField: "maxDuration", type: "duration" },
    {
      xmlElement: "days",
      dbField: "days",
      type: "array",
      itemElement: "day",
      itemType: "dayType",
    },
  ],
};

// Class xml data validation rules are consistent with rules in form data validation,
// but xml data validation also transform and coerce data to fit database schema rules
export const classXmlValidationRules = [
  check("classCode")
    .toInt()
    .isInt({ min: 1, max: 9999999999 })
    .withMessage("classCode must be a valid integer between 1 and 9999999999.")
    .bail(),
  check("className")
    .customSanitizer((v) => (v.length > 50 ? v.slice(0, 50) : v))
    .isLength({ min: 2, max: 50 })
    .withMessage("className must be between 2 and 50 characters.")
    .customSanitizer((v) => purify.sanitize(v, strictSanitizeRules)),
  check("shortDesc")
    .customSanitizer((v) =>
      // eslint-disable-next-line no-nested-ternary
      v.length > 100 ? v.slice(0, 100) : v.length < 5 ? v.padEnd(5, "z") : v,
    )
    .isLength({ min: 5, max: 100 })
    .withMessage("shortDesc must be between 2 and 50 characters.")
    .customSanitizer((v) => purify.sanitize(v, strictSanitizeRules)),
  check("longDesc")
    .customSanitizer((v) =>
      // eslint-disable-next-line no-nested-ternary
      v.length > 20000
        ? v.slice(0, 20000)
        : v.length < 20
          ? v.padEnd(20, "z")
          : v,
    )
    .isLength({ min: 20, max: 20000 })
    .withMessage("longDesc must be between 20 and 20000 characters.")
    .default("The class content will be ready soon, stay tune!")
    .customSanitizer((v) => purify.sanitize(v, richtextSanitizeRules)),
  check("imageCover")
    .optional()
    .customSanitizer((v) => {
      if (v && v.length > 0) {
        return v.length > 200 ? v.slice(-200) : v;
      }
      return null;
    })
    .customSanitizer((v) => {
      const reg = /\.(jpg|jpeg|png|webp)$/i;
      if (v && !v.match(reg)) {
        return null;
      }
      return v;
    })
    .isLength({ max: 200 })
    .withMessage("imageCover file name must not exceed 200 characters.")
    .customSanitizer((v) => purify.sanitize(v, strictSanitizeRules)),
  check("minDuration")
    .customSanitizer((value) => {
      const minDurationMins = parseInt(parseDurationToSeconds(value) / 60, 10);
      // eslint-disable-next-line no-nested-ternary
      return Number.isNaN(minDurationMins) || minDurationMins < 30
        ? 30
        : minDurationMins > 999
          ? 999
          : minDurationMins;
    })
    .isInt({ min: 30, max: 999 })
    .withMessage("minDuration must be 30 - 999 mins.")
    .default(30),
  check("maxDuration")
    .customSanitizer((value) => {
      const maxDurationMins = parseInt(parseDurationToSeconds(value) / 60, 10);
      // eslint-disable-next-line no-nested-ternary
      return Number.isNaN(maxDurationMins) || maxDurationMins < 30
        ? 30
        : maxDurationMins > 999
          ? 999
          : maxDurationMins;
    })
    .isInt({ min: 30, max: 999 })
    .withMessage("minDuration must be 30 - 999 mins.")
    .default(60),
  check("days")
    .customSanitizer((arr) =>
      arr
        .map((item) => item.toUpperCase())
        .filter(async (item) => {
          const dayOptionsArr = await getDayOptions();
          return dayOptionsArr.includes(item);
        })
        .join(","),
    )
    .customSanitizer((v) => purify.sanitize(v, strictSanitizeRules)),
];

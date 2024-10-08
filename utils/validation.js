// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from "jsdom";
// eslint-disable-next-line import/no-extraneous-dependencies
import DOMPurify from "dompurify";
import { body } from "express-validator";

const { window } = new JSDOM("");
const purify = DOMPurify(window);

// validate a string
export const validateText = (name, min = 0, max = 254, required = true) => {
  let chain;

  if (required) {
    chain = body(name).trim().notEmpty().withMessage(`${name} is required.`);
  } else {
    chain = body(name).optional().trim();
  }

  if (min > 0) {
    chain = chain
      .isLength({ min })
      .withMessage(
        `${name} is too short, should be more than ${min} characters.`,
      );
  }
  if (max > 0) {
    chain = chain
      .isLength({ max })
      .withMessage(`${name} is too long, should not exceed ${max} characters.`);
  }
  chain = chain.escape();

  return chain;
};

export const validateInteger = (
  name,
  min = 0,
  max = 999999999,
  required = true,
) => {
  let chain = body(name);
  if (required) {
    chain = chain.notEmpty().withMessage(`${name} is required.`);
  }

  chain.toInt().isInt().withMessage(`${name} must be a valid integer.`);

  chain = chain.custom((value) => {
    const isValid = value >= min && value <= max;

    if (!isValid) {
      throw new Error(`${name} must be between ${min} and ${max}.`);
    }

    return true;
  });

  return chain;
};

// validate an email address
// https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
export const validateEmail = (
  name,
  runInUse = false,
  cb = undefined,
  required = true,
) => {
  let chain = body(name).trim().toLowerCase();

  if (required) {
    chain = chain.notEmpty().withMessage(`${name} is required.`);
  }

  chain = chain.isEmail().withMessage(`Invalid email address.`);
  chain = chain
    .isLength({ max: 254 })
    .withMessage(`${name} must not exceed 254 characters.`);

  if (runInUse === true && typeof cb === "function") {
    chain = chain.custom(async (value) => {
      const rows = await cb(value);
      if (rows.length > 0) {
        throw new Error("Email already in use.");
      }
    });
  }

  // if (runExist === true && typeof cb === "function") {
  //   chain = chain.custom(async (value) => {
  //     const [rows] = await cb(value);
  //     if (rows.length === 0) {
  //       throw new Error("Email not exist.");
  //     }
  //   });
  // }

  // DON'T ESCAPE EMAIL, BECAUSE A VALIDATE EMAIL ALREADY ESCAPED UNALLOWED CHARACTERS BASED ON RFC 5322
  // chain = chain.escape();
  return chain;
};

export const validatePostcode = (name, required = true) => {
  let chain;

  if (required) {
    chain = body(name).trim().notEmpty().withMessage(`${name} is required.`);
  } else {
    chain = body(name).optional().trim();
  }

  chain = chain.custom((v) => {
    if (v && !/^\d{4}$/.test(v)) {
      throw new Error(`${name} must be four digits.`);
    }
    return true;
  });

  return chain;
};

// validate phone number
// https://en.wikipedia.org/wiki/Telephone_numbers_in_Australia#:~:text=Australia%20or%20internationally.-,Mobile%20phones,XXX%20for%20an%20international%20audience.
export const validatePhoneNumber = (name, required = true) => {
  let chain;

  if (!required) {
    chain = body(name).optional();
  }

  chain = body(name).trim().notEmpty().withMessage(`${name} is required.`);

  chain = chain
    .matches(/^0[2-478]\d{8}$/)
    .withMessage(
      "Invalid phone number. Your phone number must be 10 digits without any spaces, parentheses, or non-numeric characters",
    );

  chain = chain.escape();

  return chain;
};

// Validate password
export const validatePassword = (name, required = true) => {
  let chain = body(name).trim();
  if (required) {
    chain = chain.notEmpty().withMessage(`${name} is required.`);
  }

  chain = chain.custom((value) => {
    const isValid =
      value.length >= 8 &&
      value.length <= 254 &&
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[\W_]/.test(value);

    if (!isValid) {
      throw new Error(
        "Invalid password. Your password must be at least 8 characters long, at most 254 characters long, containing uppercase(s), lowercase(s), number(s), and special characters.",
      );
    }
    return true;
  });

  return chain;
};

// compare password
export const compareString = (plural, str1Name, str2Name) =>
  body(str2Name)
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body[str1Name]) {
        throw new Error(`${plural} do not match.`);
      }
      return true;
    });

// export const compareNumber = (num1Name, num2Name) => {};

export const validateDate = (name, required = true) => {
  let chain;
  if (required) {
    chain = body(name).notEmpty().withMessage(`${name} is required.`);
  }
  chain = body(name).isDate().withMessage(`Invalid date`);
  return chain;
};

export const validSelect = (name, optionArr, required = true) => {
  let chain;
  if (required) {
    chain = body(name).notEmpty().withMessage(`${name} is required.`);
  } else {
    chain = body(name).optional();
  }

  chain = chain.custom((v) => {
    if (!Array.isArray(v)) {
      if (!optionArr.includes(v)) {
        throw new Error("Not a valid option.");
      }
      return true;
    }

    if (Array.isArray(v)) {
      const notInOptions = v.filter((item) => !optionArr.includes(item));
      if (notInOptions.length === 1) {
        throw new Error(`${notInOptions[0]} is not an valid option.`);
      } else if (notInOptions.length > 1) {
        throw new Error(`${notInOptions.join()} are not an valid options.`);
      }
      return true;
    }
  });

  chain = chain.escape();
  return chain;
};

export const checkUnique = (name, cb, skipCheck = false) =>
  body(name).custom(async (value, { req }) => {
    if (skipCheck || !value || typeof cb !== "function") {
      // SKIP UNQIUENESS CHECK IF SKIPCHECK IS TRUE
      return true;
    }
    const row = await cb(value);
    if (row.length > 0) {
      throw new Error(`${value} already exists`);
    }
    return true;
  });

export const checkInDB = (name, cb) =>
  body(name).custom(async (value, { req }) => {
    if (!value || typeof cb !== "function") {
      throw new Error(`Invalid option`);
    }
    const row = await cb(value);
    if (!row) {
      throw new Error(`${value} is invalid`);
    }
    return true;
  });

export const sanitizeTextarea = (
  name,
  min = 0,
  max = 20000,
  required = true,
) => {
  let chain;

  if (required) {
    chain = body(name).trim().notEmpty().withMessage(`${name} is required.`);
  } else {
    chain = body(name).optional().trim();
  }

  if (min > 0) {
    chain = chain
      .isLength({ min })
      .withMessage(
        `${name} is too short, should be more than ${min} characters.`,
      );
  }
  if (max > 0) {
    chain = chain
      .isLength({ max })
      .withMessage(`${name} is too long, should not exceed ${max} characters.`);
  }

  chain.escape();

  // chain = chain.customSanitizer((value) => {
  //   if (value) {
  //     const sanitizedContent = purify.sanitize(value, {
  //       ALLOWED_TAGS: [],
  //       ALLOWED_ATTR: [],
  //     });

  //     return sanitizedContent.toString();
  //   }
  //   return "";
  // });

  return chain;
};

export const sanitizeRichText = (
  name,
  min = 0,
  max = 20000,
  required = true,
) => {
  let chain;

  if (required) {
    chain = body(name).trim().notEmpty().withMessage(`${name} is required.`);
  } else {
    chain = body(name).optional().trim();
  }

  if (min > 0) {
    chain = chain
      .isLength({ min })
      .withMessage(
        `${name} is too short, should be more than ${min} characters.`,
      );
  }
  if (max > 0) {
    chain = chain
      .isLength({ max })
      .withMessage(`${name} is too long, should not exceed ${max} characters.`);
  }

  chain = chain
    .customSanitizer((value) => {
      let sanitizedContent = purify.sanitize(value, {
        ALLOWED_TAGS: [
          "p",
          "b",
          "a",
          "br",
          "ul",
          "li",
          "ol",
          "strong",
          "em",
          "img",
        ],
        FORBID_TAGS: ["script"],
        FORBID_ATTR: ["class"],
        FORBID_CONTENTS: ["script"],
      });
      sanitizedContent = sanitizedContent.toString();

      // REMOVE SCRIPT TAG AND CONTENT
      sanitizedContent = sanitizedContent.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        "",
      );
      sanitizedContent = sanitizedContent.replace(
        /&lt;script\b[^&]*(?:(?!&lt;\/script&gt;)&[^&]*)*&lt;\/script&gt;/gi,
        "",
      );

      sanitizedContent = sanitizedContent.trim();
      // REMOVE QUILL p wrapper
      if (
        !sanitizedContent ||
        sanitizedContent === "<p></p>" ||
        sanitizedContent === "<p><br></p>"
      ) {
        return "";
      }

      return sanitizedContent;
    })
    .trim()
    .notEmpty()
    .withMessage(`${name} is required.`);

  return chain;
};

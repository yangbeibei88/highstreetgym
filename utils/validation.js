// eslint-disable-next-line import/no-extraneous-dependencies
import { body } from "express-validator";

// validate a string
export const validateText = (name, min = 0, max = 254, required = true) => {
  let chain = body(name).trim();
  if (required) {
    chain = chain.notEmpty().withMessage(`${name} is required.`);
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
      const [rows] = await cb(value);
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

// validate phone number
// https://en.wikipedia.org/wiki/Telephone_numbers_in_Australia#:~:text=Australia%20or%20internationally.-,Mobile%20phones,XXX%20for%20an%20international%20audience.
export const validatePhoneNumber = (name, required = true) => {
  let chain = body(name).trim();

  if (required) {
    chain = chain.notEmpty().withMessage(`${name} is required.`);
  }

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

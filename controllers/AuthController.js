// eslint-disable-next-line import/no-extraneous-dependencies
import asyncHandler from "express-async-handler";
// eslint-disable-next-line import/no-extraneous-dependencies
import { validationResult } from "express-validator";
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from "bcrypt";
import {
  compareString,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateText,
} from "../utils/validation.js";
import { findUserByEmail, insertUser } from "../models/UserModel.js";
import { createSendToken } from "../utils/jwtToken.js";

export const renderSignupAction = (req, res, next) => {
  res.status(200).render("signup", { title: "Sign Up" });
};

export const renderLoginAction = (req, res, next) => {
  res.status(200).render("login", { title: "Login" });
};

export const authenticateSignupAction = asyncHandler(async (req, res, next) => {
  // 1) VALIDATE & SANITISE FIELDS
  await Promise.all([
    validateText("register_firstname", 2, 20, true).run(req),
    validateText("register_surname", 2, 20, true).run(req),
    validateEmail("register_email", true, findUserByEmail, true).run(req),
    validatePhoneNumber("register_mobilenumber", true).run(req),
    validatePassword("register_password", true).run(req),
    compareString(
      "Passwords",
      "register_password",
      "register_confirmPassword",
    ).run(req),
  ]);

  // 2) EXTRACT VALIDATION ERRORS
  const errors = validationResult(req);
  console.log(errors);

  // 3) EXTRACT VALIDATED AND SANITIZED INPUT DATA EXCEPT PASSWORD
  const newUser = {
    firstName: req.body.register_firstname,
    lastName: req.body.register_surname,
    emailAddress: req.body.register_email,
    phoneNumber: req.body.register_mobilenumber,
  };

  console.log(`input: ${newUser}`);

  // If any errors, re-render signup page again with sanitised values & error message
  if (!errors.isEmpty()) {
    return res.status(400).render("signup", {
      newUser,
      errors: errors.array(),
    });
  }
  // 4) HASH PASSWORD
  const password = await bcrypt.hash(req.body.register_password, 12);
  newUser.password = password;

  // 5) EXTRACT VALUES
  // order: firstName, lastName, emailAddress, phoneNumber, password

  // 6) GET NEW DATA ENTRY ESPECIALLY GET `insertId` FOR PASSING IN `createSendToken`
  const newUserData = await insertUser(newUser);

  createSendToken(res, newUserData);

  res.redirect("/");
});

export const authenticateLoginAction = asyncHandler(async (req, res, next) => {
  // 1) VALIDATE & SANITISE FIELDS
  await Promise.all([
    validateEmail("login_email", false, undefined, true).run(req),
    validatePassword("login_password", true).run(req),
  ]);

  // 2) EXTRACT VALIDATION ERRORS
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("login", {
      login_email: req.body.login_email,
      errors: errors.array(),
    });
  }

  // 3) CHECK IF LOGIN EMAIL & PASSWORD ARE CORRECT
  const [user] = await findUserByEmail(req.body.login_email);
  const verifyPasswordPromise = await bcrypt.compare(
    req.body.login_password,
    user[0].password,
  );

  // console.log(user.length);
  console.log(verifyPasswordPromise);

  if (!user.length || !verifyPasswordPromise) {
    return res.status(401).render("login", {
      credentialError: "Incorrect credentials",
    });
  }

  // 4) IF LOGIN CREDENTIALS CORRECT, SEND TOKEN TO CLIENT
  // pass in user.pop() as an object so that token function can grab userId
  createSendToken(res, user.pop());

  // redirect to Home page
  res.redirect("/");
});

export const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
};

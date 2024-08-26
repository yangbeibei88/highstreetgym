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

export const renderSignupAction = (req, res, next) => {
  res.status(200).render("signup", { title: "Sign Up" });
};

export const renderLoginAction = (req, res, next) => {
  res.status(200).render("login", { title: "Login" });
};

export const authenticateSignupAction = asyncHandler(async (req, res, next) => {
  // 1) VALIDATE & SANITISE FIELDS
  validateText("register_firstname", 2, 20, true);
  validateText("register_surname", 2, 20, true);
  validateEmail("register_email", true, findUserByEmail, true);
  validatePhoneNumber("register_mobilenumber", true);
  validatePassword("register_password", true);
  compareString("Passwords", "register_password", "register_confirmPassword");

  // 2) EXTRACT VALIDATION ERRORS
  const errors = validationResult(req);

  // 3) EXTRACT VALIDATED AND SANITIZED INPUT DATA EXCEPT PASSWORD
  const inputData = {
    firstname: req.body.register_firstname,
    surname: req.body.register_surname,
    email: req.body.register_email,
    phoneNumber: req.body.register_mobilenumber,
  };

  // If any errors, re-render signup page again with sanitised values & error message
  if (!errors.isEmpty()) {
    res.render("signup", {
      inputData,
      errors,
    });
  } else {
    // 1) HASH PASSWORD
    const password = await bcrypt.hash(req.body.register_password, 12);
    inputData.password = password;
    // 2) EXTRACT VALUES
    // order: firstName, lastName, emailAddress, phoneNumber, password
    const valueArr = Object.values(inputData);

    await insertUser(valueArr);

    res.redirect("/");
  }
});

export const authenticateLoginAction = async (req, res, next) => {
  console.log(req.body);
};

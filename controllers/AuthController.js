// eslint-disable-next-line import/no-extraneous-dependencies
import asyncHandler from "express-async-handler";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  compareString,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateText,
} from "../utils/validation.js";
import { findUserByEmail } from "../models/UserModel.js";

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
  validatePhoneNumber("register_mobilenumber", true);
  validateEmail("register_email", true, findUserByEmail, true);
  validatePassword("register_password", true);
  compareString("Passwords", "register_password", "register_confirmPassword");
});

export const authenticateLoginAction = async (req, res, next) => {
  console.log(req.body);
};

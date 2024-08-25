import { findUserByEmail } from "../models/UserModel.js";
import {
  validateText,
  validatePhoneNumber,
  validateEmail,
  validatePassword,
  compareString,
} from "../utils/validation.js";

export const renderSignupAction = async (req, res, next) => {
  res.status(200).render("signup", { title: "Sign Up" });
};
export const renderLoginAction = async (req, res, next) => {
  res.status(200).render("login", { title: "Login" });
};
export const authenticateSignupAction = async (req, res, next) => {
  console.log(req.body);

  // 1) SCOPE FIELDS
  const inputData = {
    register_firstname: req.body.register_firstname,
    register_lastname: req.body.register_lastname,
    register_mobilenumber: req.body.register_mobilenumber,
    register_email: req.body.register_email,
    register_password: req.body.register_password,
    register_confirmPassword: req.body.register_confirmPassword,
  };

  // 2) FORM FIELDS VALIDATION
  let errors = [
    {
      register_firstname: validateText(
        "firstname",
        req.body.register_firstname,
        2,
        20,
      ),
    },
    {
      register_lastname: validateText(
        "lastname",
        req.body.register_lastname,
        2,
        20,
      ),
    },
    {
      register_mobilenumber: validatePhoneNumber(
        "phone number",
        req.body.register_mobilenumber,
      ),
    },
    {
      register_email: validateEmail("Email", req.body.register_email),
    },
    {
      register_password: validatePassword(
        "password",
        req.body.register_password,
      ),
    },
    {
      register_confirmPassword: compareString(
        "passwords",
        req.body.register_password,
        req.body.register_confirmPassword,
      ),
    },
  ];

  // 3) VALIDATE IF EMAIL ALREADY EXITS IN DB
  const [existingUser] = await findUserByEmail(req.body.register_email);
  if (existingUser) {
    errors.register_password =
      "This email already exists, please try to login.";
  }

  // 4) FILTER ERROR VALUES THAT ARE NOT NULL
  errors = errors.filter((obj) => Object.values(obj)[0] !== null);

  if (errors.length > 0) {
    res.status(400).render("signup", {
      errors,
      inputData,
    });
  }

  // 4) DATA SANITISATION
};

export const authenticateLoginAction = async (req, res, next) => {
  console.log(req.body);
};

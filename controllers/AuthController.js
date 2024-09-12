import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import {
  compareString,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateText,
} from "../utils/validation.js";
import {
  findUserByEmail,
  getUser,
  insertUser,
  updatePassword,
} from "../models/UserModel.js";
import { createSendToken, decodeJwt } from "../utils/jwtToken.js";
import { AppError } from "../utils/AppError.js";

export const renderSignupAction = (req, res, next) => {
  if (req.user) {
    return next(
      new AppError("You cannot sign up when you are logged in!", 400, {
        text: "Back to My Dashboard",
        link: "/auth/account",
      }),
    );
  }
  return res
    .status(200)
    .render("signup", { title: "Sign Up", showHeader: false });
};

export const renderLoginAction = (req, res, next) => {
  if (req.user) {
    return next(
      new AppError("You have already Logged In!", 400, {
        text: "Back to My Dashboard",
        link: "/auth/account",
      }),
    );
  }
  return res.status(200).render("login", { title: "Login", showHeader: false });
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

  req.session.successMsg = "Welcome to High Street Gym!🙌";

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

  // 3) CHECK IF LOGIN EMAIL IS IN THE DATABASE
  const user = await findUserByEmail(req.body.login_email);
  if (!user || !user.length) {
    return res.status(401).render("login", {
      errorMsg: "Incorrect credentials",
    });
  }

  // 4) CHECK IF PASSWORD IS CORRECT
  const userPassword = await user[0].password;
  const verifyPasswordPromise = await bcrypt.compare(
    req.body.login_password,
    userPassword,
  );

  // console.log(user.length);
  console.log(verifyPasswordPromise);

  if (!verifyPasswordPromise) {
    return res.status(401).render("login", {
      errorMsg: "Incorrect credentials",
    });
  }

  // 4) IF LOGIN CREDENTIALS CORRECT, SEND TOKEN TO CLIENT
  // pass in user.pop() as an object so that token function can grab userId
  createSendToken(res, user.pop());

  req.session.successMsg = "You have successfully logged in!";

  // redirect to Home page
  res.redirect("/");
});

export const logoutAction = (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
    path: "/",
  });
  console.log("Logout cookie cleared:", req.cookies.jwt);
  req.session.successMsg = "You have successfully logged out!";
  res.redirect("/?loggedout=true");
};

export const protect = asyncHandler(async (req, res, next) => {
  // 1) GET TOKEN
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token || token === "") {
    return next(
      new AppError("Please login to get access.", 401, {
        text: "Go to Login",
        link: "/login",
      }),
    );
  }

  // VERIFY TOKEN
  const decoded = await decodeJwt(token, process.env.JWT_SECRET);

  // 3) CHECK IF USER STILL EXISTS
  const user = await getUser(decoded.id);

  if (!user || user.length === 0) {
    return next(new AppError("User does not exists", 401));
  }

  const currentUser = user.pop();
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

export const isLoggedIn = async (req, res, next) => {
  // 1) TO CHECK IF A USER IS A LOGGED-IN USER OR NOT, CHECK IF JWT TOKEN EXISTS IN COOKIES
  if (req.cookies.jwt) {
    try {
      // 1) VERIFY TOKEN
      const decoded = await decodeJwt(req.cookies.jwt, process.env.JWT_SECRET);

      // 2) CHECK IF USER STILL EXISTS
      const user = await getUser(decoded.id);
      console.log(decoded);
      // console.log(user);
      // 3) IF USER NOT EXIST, RETURN NEXT MIDDLEWARE
      if (!user || !user.length) {
        return next();
      }
      // 4) TODO: CHECK IF USER CHANGED PASSWORD AFTER JWT TOKEN WAS ISSUED

      // IF PASSED ALL, THEN AUTHORIZE TO VIEW PAGES
      const currentUser = user.pop();
      req.user = currentUser;
      res.locals.user = currentUser;
      // console.log(loggedInUser);
      return next();
    } catch (error) {
      console.error("JWT verification error:", error);
      return next();
    }
  }
  next();
};

export const authorisedTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.userRole)) {
      return next(
        new AppError("Sorry, you are not authorised for this resource.", 403),
      );
    }
    next();
  };

export const updatePasswordAction = asyncHandler(async (req, res, next) => {
  const user = await getUser(req.user.userId);
  if (!user.length) {
    return next(
      new AppError("You are not authorised to change the password", 403),
    );
  }

  const userPassword = await user[0].password;
  // 1) CHECK IF ENTERED CURRENT PASSWORD IS CORRECT
  const verifyPasswordPromise = await bcrypt.compare(
    req.body.currentPassword,
    userPassword,
  );

  console.log(verifyPasswordPromise);

  if (!verifyPasswordPromise) {
    req.session.errorMsg = "Incorrect password ❌";
    return res.status(401).render("account/change-password", {
      title: "Change Password - Incorrect ❌",
      credentialError: req.session.errorMsg,
    });
  }
  // 2) IF CURRENT PASSWORD IS CORRECT, CHECK IF NEW PASSWORD AND ITS PASSWORD CONFIRM IS MATCHED
  await Promise.all([
    validatePassword("newPassword", true).run(req),
    compareString("Passwords", "newPassword", "confirmNewPassword").run(req),
  ]);

  // 2) EXTRACT VALIDATION ERRORS
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).render("account/change-password", {
      title: "Change Password - INVALID ❌",
      errors: errors.array(),
    });
  }

  // 4) HASH PASSWORD
  const password = await bcrypt.hash(req.body.newPassword, 12);
  user[0].password = password;
  console.log(user[0]);

  // UPDATE DB
  await updatePassword(user[0]);

  createSendToken(res, user[0]);

  return res.render("account/change-password", {
    title: "Change Password - Success🎉",
    success: true,
    successMsg: "Your password has been updated successfully! 🎉",
  });
});

import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import {
  sanitizeTextarea,
  validatePhoneNumber,
  validatePostcode,
  validateText,
  validSelect,
} from "../../utils/validation.js";
import { updateUser } from "../../models/UserModel.js";

const states = ["ACT", "QLD", "NSW", "NT", "SA", "TAS", "VIC", "WA"];

export const showMyprofileAction = asyncHandler(async (req, res, next) => {
  // INITIALISE FORM
  const inputData = await req.user;

  res
    .status(200)
    .render("account/profileForm", { title: "My Profile", inputData, states });
});

export const updateMyprofileAction = asyncHandler(async (req, res, next) => {
  // 1) VALIDATION & SANITISATION
  await Promise.all([
    validateText("profile_firstname", 2, 20, true).run(req),
    validateText("profile_surname", 2, 20, true).run(req),
    validatePhoneNumber("profile_mobilenumber", true).run(req),
    validateText("profile_address", 0, 100, false).run(req),
    validateText("profile_suburb", 0, 20, false).run(req),
    validatePostcode("profile_postcode", false).run(req),
    validSelect("profile_state", states, false),
    sanitizeTextarea("profile_bio", 0, 200, false).run(req),
  ]);

  const errors = validationResult(req);
  console.log(errors);

  const inputData = {
    firstName: req.body.profile_firstname,
    lastName: req.body.profile_surname,
    phoneNumber: req.body.profile_mobilenumber,
    address: req.body.profile_address,
    suburb: req.body.profile_suburb,
    postcode: +req.body.profile_postcode,
    state: req.body.profile_state,
    bio: req.body.profile_bio,
    userId: req.user.userId,
    // eslint-disable-next-line no-nested-ternary
    avatar: req.file
      ? req.file.filename
      : req.user.avatar
        ? req.user.avatar
        : null,
  };

  console.log("before validation: ", inputData);

  if (!errors.isEmpty()) {
    return res.status(400).render("account/profileForm", {
      title: "My Profile",
      inputData,
      states,
      errors: errors.array(),
    });
  }

  console.log("After validation: ", inputData);

  await updateUser(inputData);

  return res.status(200).render("account/profileForm", {
    title: "My Profile",
    inputData,
    states,
    successMsg: "You have updated your profile successfully! 🎉",
  });
});

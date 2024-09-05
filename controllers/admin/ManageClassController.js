import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import {
  getAllClasses,
  getClass,
  getClassByCode,
  getClassByName,
  getDayOptions,
  saveClass,
} from "../../models/ClassModel.js";
import { AppError } from "../../utils/AppError.js";
import {
  checkUnique,
  sanitizeRichText,
  sanitizeTextarea,
  validateInteger,
  validateText,
  validSelect,
} from "../../utils/validation.js";

export const listAdminClassesAction = asyncHandler(async (req, res, next) => {
  const [classes] = await getAllClasses();

  res.status(200).render("admin/manage-classes", {
    title: "Manage Classes",
    classes,
  });
});

export const showClassFormAction = asyncHandler(async (req, res, next) => {
  const dayOptions = await getDayOptions();
  // INITIALISE FORM
  let inputData = {
    classId: "",
    className: "",
    classCode: "",
    shortDesc: "",
    longDesc: "",
    minDuration: "",
    maxDuration: "",
    days: [],
    imageCover: null,
  };

  if (req.params.classId) {
    const [course] = await getClass(+req.params.classId);
    if (!course) {
      next(new AppError("NOT FOUND", 404));
    }
    inputData = await course[0];
  }

  res.render("admin/classForm", {
    title: req.params.classId ? "Edit Class" : "Create Class",
    dayOptions,
    inputData,
  });
});

export const saveClassFormAction = asyncHandler(async (req, res, next) => {
  const dayOptions = await getDayOptions();
  const classId = req.body.classId ? +req.body.classId : null;

  let existingClass = null;
  if (classId) {
    const [existingClassData] = await getClass(classId);
    existingClass = existingClassData[0];
  }

  console.log(existingClass);

  console.log(req.file);
  // 1) VALIDATE & SANITISE FIELDS
  await Promise.all([
    validateText("className", 2, 50, true).run(req),
    checkUnique(
      "className",
      getClassByName,
      !!classId &&
        req.body.className?.trim().toLowerCase() ===
          existingClass?.className?.trim().toLowerCase(),
    ).run(req),
    validateInteger("classCode", 1, 9999999999, true).run(req),
    checkUnique(
      "classCode",
      getClassByCode,
      !!classId && +req.body.classCode === existingClass?.classCode,
    ).run(req),
    sanitizeTextarea("shortDesc", 5, 100).run(req),
    validateInteger("minDuration", 30, 999, true).run(req),
    validateInteger("maxDuration", 30, 999, true).run(req),
    validSelect("days", dayOptions, true).run(req),
    sanitizeRichText("longDesc", 20, 20000, true).run(req),
  ]);

  const errors = validationResult(req);
  console.log(errors);

  const inputData = {
    classId: +req.body.classId,
    classCode: +req.body.classCode,
    className: req.body.className,
    shortDesc: req.body.shortDesc,
    longDesc: req.body.longDesc,
    minDuration: req.body.minDuration,
    maxDuration: req.body.maxDuration,
    days: req.body.days,
    imageCover: req.file ? req.file.filename : null,
  };

  console.log(inputData);

  if (!errors.isEmpty() || req.fileValidatorError) {
    return res.status(400).render("admin/classForm", {
      title: req.params.classId ? "Edit Class" : "Create Class",
      dayOptions,
      inputData,
      errors: errors.array(),
      uploadErr: req.fileValidatorError,
    });
  }

  const classObj = await saveClass(inputData);
  console.log(classObj);
  res.redirect(
    `/auth/admin/classForm/${classObj?.classId || req.body.classId}/edit`,
  );
});

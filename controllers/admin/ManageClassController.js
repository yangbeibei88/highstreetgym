import asyncHandler from "express-async-handler";
import {
  getAllClasses,
  getClass,
  getDayOptions,
} from "../../models/ClassModel.js";
import { AppError } from "../../utils/AppError.js";

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

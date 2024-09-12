import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import {
  getAllTimetables,
  getLevels,
  getTimetableById,
  getTimetableByNo,
  insertTimetable,
  updateTimetable,
} from "../../models/TimetableModel.js";
import { getAllClasses, getClass } from "../../models/ClassModel.js";
import { getTrainerById, getTrainers } from "../../models/UserModel.js";
import { AppError } from "../../utils/AppError.js";
import {
  checkInDB,
  checkUnique,
  validateDate,
  validateInteger,
  validSelect,
} from "../../utils/validation.js";

export const listAdminTimetableAction = asyncHandler(async (req, res, next) => {
  const timetables = await getAllTimetables(true);
  res.status(200).render("admin/manage-timetable", {
    title: "Manage Timetable",
    timetables,
  });
});

export const showTimetableFormAction = asyncHandler(async (req, res, next) => {
  const classes = await getAllClasses();
  const trainers = await getTrainers();
  const levelOptions = await getLevels();

  // INIT
  let inputData = {
    timetableId: "",
    timetableNo: "",
    classId: "",
    startDateTime: "",
    trainerId: "",
    level: "",
    capacity: "",
  };

  if (req.params.timetableId) {
    const timetable = await getTimetableById(+req.params.timetableId);
    if (!timetable) {
      next(new AppError("NOT FOUND", 404));
    }
    inputData = await timetable[0];
  }

  res.status(200).render("admin/timetableForm", {
    title: req.params.timetableId ? "Edit Timetable" : "Create Timetable",
    classes,
    trainers,
    levelOptions,
    inputData,
  });
});

export const validateTimetableForm = asyncHandler(async (req, res, next) => {
  const classes = await getAllClasses();
  const trainers = await getTrainers();
  const levelOptions = await getLevels();

  const timetableId = req.params.timetableId ? +req.params.timetableId : null;

  let existingTimetable = null;
  if (timetableId) {
    const existingTimetableData = await getTimetableById(timetableId);
    existingTimetable = existingTimetableData[0];
  }

  // VALIDATE & SANITISE FIELDS
  await Promise.all([
    validateInteger("timetableNo", 1, 9999999999, true)
      .if(() => !timetableId)
      .run(req),
    checkUnique(
      "timetableNo",
      getTimetableByNo,
      !!timetableId && +req.body.timetableNo === existingTimetable?.timetableNo,
    )
      .if(() => !timetableId)
      .run(req),
    checkInDB("classId", getClass).run(req),
    checkInDB("trainerId", getTrainerById).run(req),
    validateDate("startDateTime", req),
    validateInteger("duration", 30, 999, true).run(req),
    validSelect("level", levelOptions, true).run(req),
    validateInteger("capacity", 1, 999, true).run(req),
  ]);

  const errors = validationResult(req);
  console.log(errors);

  const inputData = {
    timetableNo: +req.body.timetableNo,
    classId: +req.body.classId,
    startDateTime: `${req.body.startDateTime.replace("T", " ")}:00`,
    trainerId: +req.body.trainerId,
    level: req.body.level,
    duration: +req.body.duration,
    capacity: +req.body.capacity,
  };

  if (timetableId) {
    inputData.timetableId = timetableId;
  }

  if (!errors.isEmpty()) {
    return res.status(400).render("admin/timetableForm", {
      title: req.body.timetableId ? "Edit Timetable" : "Create Timetable",
      classes,
      trainers,
      levelOptions,
      inputData,
      errors: errors.array(),
    });
  }

  req.inputData = inputData;
  next();
});

export const createTimetableAction = asyncHandler(async (req, res, next) => {
  const timetableObj = await insertTimetable(req.inputData);
  console.log(timetableObj);

  req.session.successMsg = `timetableNo #${timetableObj.timetableId} has been created successfully!`;

  res.redirect(`/auth/admin/timetableForm/${timetableObj.timetableId}/edit`);
});
export const updateTimetableAction = asyncHandler(async (req, res, next) => {
  await updateTimetable(req.inputData);

  req.session.successMsg = `timetableNo #${req.inputData.timetableNo} has been updated successfully!`;

  res.redirect(`/auth/admin/timetableForm/${req.inputData.timetableId}/edit`);
});

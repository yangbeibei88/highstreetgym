import asyncHandler from "express-async-handler";
import { check, validationResult } from "express-validator";
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
import { pagination } from "../../utils/pagination.js";

export const listAdminTimetableAction = asyncHandler(async (req, res, next) => {
  const timetables = await getAllTimetables(true);
  const classes = await getAllClasses();
  res.status(200).render("admin/manage-timetable", {
    title: "Manage Timetable",
    timetables,
    classes,
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

export const adminTimetableSearchFilterSortAction = asyncHandler(
  async (req, res, next) => {
    const timetables = await getAllTimetables(true);
    const classes = await getAllClasses();
    const classIds = await classes.map((c) => c.classId);

    let filteredTimetables = [...timetables];

    await Promise.all([
      check("classId")
        .optional()
        .trim()
        .toInt()
        .customSanitizer((v) => {
          if (!v) return "";
          return classIds.includes(v) ? v : "";
        })
        .default("")
        .run(req),
      check("status").trim().toLowerCase().escape().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // console.log(errors);

    if (req.query.classId) {
      filteredTimetables = filteredTimetables.filter(
        (item) => item.classId === req.query.classId,
      );
    }

    if (req.query.status) {
      filteredTimetables = filteredTimetables.filter((item) =>
        req.query.status === "active"
          ? new Date(item.startDateTime) >= Date.now()
          : new Date(item.startDateTime) < Date.now(),
      );
    }

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const paginatedTimetables = pagination(filteredTimetables, page, limit);

    console.log(req.query);

    res.json({
      timetables: paginatedTimetables.data,
      pagination: {
        currentPage: paginatedTimetables.currentPage,
        totalItems: paginatedTimetables.totalItems,
        totalPages: paginatedTimetables.totalPages,
        limit: paginatedTimetables.limit,
        next: paginatedTimetables.next || null,
        previous: paginatedTimetables.previous || null,
      },
    });
  },
);

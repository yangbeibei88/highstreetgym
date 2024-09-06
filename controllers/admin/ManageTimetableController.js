import asyncHandler from "express-async-handler";
import {
  getAllTimetables,
  getLevels,
  getTimetableById,
} from "../../models/TimetableModel.js";
import { getAllClasses } from "../../models/ClassModel.js";
import { getTrainers } from "../../models/UserModel.js";
import { AppError } from "../../utils/AppError.js";

export const listAdminTimetableAction = asyncHandler(async (req, res, next) => {
  const [timetables] = await getAllTimetables();
  res.status(200).render("admin/manage-timetable", {
    title: "Manage Timetable",
    timetables,
  });
});

export const showTimetableFormAction = asyncHandler(async (req, res, next) => {
  const [classes] = await getAllClasses();
  const [trainers] = await getTrainers();
  const levelOptions = await getLevels();

  // INIT
  let inputData = {
    timetableId: "",
    timetableNo: "",
    course: "",
    startDateTime: "",
    trainer: "",
    level: "",
    capacity: "",
  };

  if (req.params.timetableId) {
    const [timetable] = await getTimetableById(+req.params.timetableId);
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

export const saveTimetableFormAction = asyncHandler(
  async (req, res, next) => {},
);

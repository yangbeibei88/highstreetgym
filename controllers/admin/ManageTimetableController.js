import asyncHandler from "express-async-handler";
import { getAllTimetables, getLevels } from "../../models/TimetableModel.js";
import { getAllClasses } from "../../models/ClassModel.js";
import { getTrainers } from "../../models/UserModel.js";

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
  res.status(200).render("admin/timetableForm", {
    title: "Add Timetable",
    classes,
    trainers,
    levelOptions,
    inputData,
  });
});

export const saveTimetableFormAction = asyncHandler(
  async (req, res, next) => {},
);

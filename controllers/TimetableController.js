import asyncHandler from "express-async-handler";
import {
  getAllTimetables,
  getTimetableByUserId,
} from "../models/TimetableModel.js";
import { getAllClasses } from "../models/ClassModel.js";

export const timetableListAction = asyncHandler(async (req, res, next) => {
  let myBookings = [];
  let myBookingTimetableIds = [];
  const timetables = await getAllTimetables();
  const classes = await getAllClasses();

  if (req.user) {
    myBookings = await getTimetableByUserId(req.user.userId);
    myBookingTimetableIds = await myBookings.reduce((acc, cur) => {
      acc.push(cur.timetableId);
      return acc;
    }, []);
    console.log(myBookingTimetableIds);
  }

  res.status(200).render("timetable", {
    title: "Timetable",
    classes,
    timetables,
    myBookings,
    myBookingTimetableIds,
  });
});

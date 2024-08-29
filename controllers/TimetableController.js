import asyncHandler from "express-async-handler";
import {
  getAllTimetables,
  getTimetableByUserId,
} from "../models/TimetableModel.js";
import { getAllClasses } from "../models/ClassModel.js";

export const timetableListAction = asyncHandler(async (req, res, next) => {
  const [timetables] = await getAllTimetables();
  const [classes] = await getAllClasses();
  const [myBookings] = await getTimetableByUserId(req.user.userId);
  const myBookingTimetableIds = await myBookings.reduce((acc, cur) => {
    acc.push(cur.timetableId);
    return acc;
  }, []);
  console.log(myBookingTimetableIds);
  res.status(200).render("timetable", {
    title: "Timetable",
    classes,
    timetables,
    myBookings,
    myBookingTimetableIds,
  });
});

import asyncHandler from "express-async-handler";
import { getAllClasses, getClass } from "../models/ClassModel.js";
import {
  getTimetableByClassId,
  getTimetableByUserId,
} from "../models/TimetableModel.js";

export const classListAction = asyncHandler(async (req, res, next) => {
  const classes = await getAllClasses();
  // console.log(classes);
  res.status(200).render("classes", {
    title: "All classes",
    showHeader: false,
    classes,
  });
});

export const classShowAction = asyncHandler(async (req, res, next) => {
  let myBookings = [];
  let myBookingTimetableIds = [];
  const course = await getClass(+req.params.classId);
  const timetables = await getTimetableByClassId(+req.params.classId);

  if (req.user) {
    myBookings = await getTimetableByUserId(req.user.userId);
    myBookingTimetableIds = await myBookings.reduce((acc, cur) => {
      acc.push(cur.timetableId);
      return acc;
    }, []);
    console.log(myBookingTimetableIds);
  }
  res.status(200).render("class", {
    title: course[0].className,
    showHeader: false,
    course,
    timetables,
    myBookings,
    myBookingTimetableIds,
  });
});

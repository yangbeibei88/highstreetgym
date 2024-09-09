import asyncHandler from "express-async-handler";
import { pagination } from "../utils/pagination.js";
import {
  getAllTimetables,
  getTimetableByUserId,
} from "../models/TimetableModel.js";
import { getAllClasses } from "../models/ClassModel.js";

const getUserBookings = async (user) => {
  let myBookings = [];
  let myBookingTimetableIds = [];
  if (user) {
    myBookings = await getTimetableByUserId(user.userId);
    console.log(myBookings);
    myBookingTimetableIds = myBookings.map((booking) => booking.timetableId);
  }

  return { myBookings, myBookingTimetableIds };
};

const getTimetablsAndClasses = async () => {
  const timetables = await getAllTimetables();
  const classes = await getAllClasses();
  return { timetables, classes };
};

// const paginatedTimetable = async () => {

// }

export const timetableListAction = asyncHandler(async (req, res, next) => {
  const { timetables, classes } = await getTimetablsAndClasses();
  const { myBookings, myBookingTimetableIds } = await getUserBookings(req.user);

  res.status(200).render("timetable", {
    title: "Timetable",
    classes,
    timetables,
    myBookings,
    myBookingTimetableIds,
  });
});

export const timetableSearchFilterSortAction = asyncHandler(
  async (req, res, next) => {
    const timetables = await getAllTimetables();
    const { myBookings, myBookingTimetableIds } = await getUserBookings(
      req.user,
    );

    let filteredTimetables = [...timetables];

    // Filter by class
    if (req.query.classFilter) {
      filteredTimetables = filteredTimetables.filter(
        (item) => item.classId === +req.query.classFilter,
      );
    }

    if (req.query.fromDate) {
      filteredTimetables = filteredTimetables.filter(
        (item) => new Date(item.startDateTime) >= new Date(req.query.fromDate),
      );
    }

    if (req.query.toDate) {
      filteredTimetables = filteredTimetables.filter(
        (item) => new Date(item.startDateTime) >= new Date(req.query.toDate),
      );
    }
    // console.log(filteredTimetables);
    const paginatedTimetables = pagination(
      filteredTimetables,
      +req.query.page || 1,
      +req.query.limit || 10,
    );
    res.json({
      // timetables: filteredTimetables,
      timetables: paginatedTimetables.data,
      myBookingTimetableIds,
      myBookings,
      pagination: paginatedTimetables,
    });
  },
);

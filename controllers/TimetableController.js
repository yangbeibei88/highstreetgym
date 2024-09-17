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
    subtitle: "Book a class that suits your time!",
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
        (item) => new Date(item.startDateTime) <= new Date(req.query.toDate),
      );
    }

    // // Debug: Log the filtered timetables length
    // console.log(
    //   `Backend Filtered Timetables Count: ${filteredTimetables.length}`,
    // );

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const paginatedTimetables = pagination(filteredTimetables, page, limit);

    // console.log(`Paginated Data Length: ${paginatedTimetables.data.length}`);
    // console.log(`Total Items (Filtered): ${paginatedTimetables.totalItems}`);
    // console.log(`Total Pages: ${paginatedTimetables.totalPages}`);

    console.log(req.query);

    res.json({
      // timetables: filteredTimetables,
      timetables: paginatedTimetables.data,
      myBookingTimetableIds,
      myBookings,
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

import asyncHandler from "express-async-handler";
import {
  getBookingById,
  getBookingByUser,
  insertBookingTrans,
} from "../../models/BookingModel.js";
import {
  getTimetableById,
  getTimetableByUserId,
} from "../../models/TimetableModel.js";
import { AppError } from "../../utils/AppError.js";

export const listAccountbookingsAction = asyncHandler(
  async (req, res, next) => {
    // req.user.userId comes from isLoggedIn middleware
    const [bookings] = await getBookingByUser(req.user.userId);
    return res.status(200).render("account/manage-bookings", {
      title: "My Bookings",
      bookings,
    });
  },
);

// USERS WHO NEVER BOOKED A TIMETABLE CLASS ARE ALLOWED TO ACCESS BOOKING FORM
// TODO: POPUP FOR BOOKED USER
export const showBookingFormAction = asyncHandler(async (req, res, next) => {
  const [result] = await getTimetableById(+req.params.timetableId);
  const [myBookings] = await getTimetableByUserId(req.user.userId);
  const myBookingTimetableIds = await myBookings.reduce((acc, cur) => {
    acc.push(cur.timetableId);
    return acc;
  }, []);
  if (!result) {
    return next(new AppError("Timetable not found", 404));
  }
  if (myBookingTimetableIds.includes(+req.params.timetableId)) {
    return next(new AppError("It seems you have booked this class", 400));
  }
  const timetable = await result[0];
  // console.log(timetable);
  res.status(200).render("account/bookingForm", {
    title: "Booking",
    timetable,
  });
});

export const createBookingAction = asyncHandler(async (req, res, next) => {
  const newBookingData = {
    timetableId: +req.body.timetableId,
    userId: req.user.userId,
  };

  const newBooking = await insertBookingTrans(newBookingData);

  res.redirect(`/account/booking-confirmation/${newBooking.bookingId}`);
});

export const showBookingConfirmAction = async (req, res, next) => {
  const [result] = await getBookingById(req.params.bookingId);

  if (!result) {
    return next(new AppError("Booking Confirmation Not Found", 404));
  }

  const booking = await result[0];

  res.render("account/booking-confirm", {
    title: "Booking Confirmation",
    booking,
  });
};

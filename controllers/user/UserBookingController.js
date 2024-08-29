import asyncHandler from "express-async-handler";
import {
  getBookingById,
  getBookingByUser,
  insertBookingTrans,
} from "../../models/BookingModel.js";
import { getTimetableById } from "../../models/TimetableModel.js";
import { AppErrorHandler } from "../../utils/AppErrorHandler.js";

export const renderMybookingsAction = asyncHandler(async (req, res, next) => {
  // req.user.userId comes from isLoggedIn middleware
  const [bookings] = await getBookingByUser(req.user.userId);
  return res.status(200).render("user/my-bookings", {
    title: "My Bookings",
    bookings,
  });
});

export const showBookingFormAction = asyncHandler(async (req, res, next) => {
  const [result] = await getTimetableById(+req.params.timetableId);
  if (!result) {
    return next(new AppErrorHandler("Timetable not found", 404));
  }
  const timetable = await result[0];
  // console.log(timetable);
  res.status(200).render("user/booking", {
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

  res.redirect(
    `/auth/${req.user.userRole === "admin" ? "admin" : "user"}/booking-confirmation/${newBooking.bookingId}`,
  );
});

export const showBookingConfirmAction = async (req, res, next) => {
  const [result] = await getBookingById(req.params.bookingId);

  if (!result) {
    return next(new AppErrorHandler("Booking Confirmation Not Found", 404));
  }

  const booking = await result[0];

  res.render("user/booking-confirm", {
    title: "Booking Confirmation",
    booking,
  });
};

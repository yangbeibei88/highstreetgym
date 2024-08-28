import asyncHandler from "express-async-handler";
import { getBookingByUser } from "../../models/BookingModel.js";

export const renderMybookingsAction = asyncHandler(async (req, res, next) => {
  // req.user.userId comes from isLoggedIn middleware
  const [bookings] = await getBookingByUser(req.user.userId);
  return res.status(200).render("user/my-bookings", {
    title: "My Bookings",
    bookings,
  });
});

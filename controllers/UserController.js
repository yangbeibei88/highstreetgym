import asyncHandler from "express-async-handler";
import { getBookingByUser } from "../models/BookingModel.js";

export const renderMydashboardAction = async (req, res, next) =>
  res.status(200).render("my-dashboard", { title: "My Dashboard" });

export const renderMybookingsAction = asyncHandler(async (req, res, next) => {
  // req.user.userId comes from isLoggedIn middleware
  const [bookings] = await getBookingByUser(req.user.userId);
  return res.status(200).render("my-bookings", {
    title: "My Bookings",
    bookings,
  });
});

export const renderMyarticlesAction = async (req, res, next) => {
  res.status(200).render("my-articles", { title: "My Articles" });
};
export const renderMycommentsAction = async (req, res, next) => {
  res.status(200).render("my-comments", { title: "My Comments" });
};
export const renderMyprofileAction = async (req, res, next) => {
  res.status(200).render("my-profile", { title: "My Profile" });
};
export const renderChangePasswordAction = async (req, res, next) => {
  res.status(200).render("change-password", { title: "Change Password" });
};

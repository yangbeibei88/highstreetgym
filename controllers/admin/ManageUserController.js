import asyncHandler from "express-async-handler";
import { getAllUsers } from "../../models/UserModel.js";

export const listUsersAction = asyncHandler(async (req, res, next) => {
  const users = await getAllUsers();
  res.status(200).render("admin/manage-users", {
    title: "Manage Users",
    users,
  });
});

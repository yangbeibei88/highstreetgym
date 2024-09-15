import asyncHandler from "express-async-handler";
import { getAllUsers, getFilteredUsers } from "../../models/UserModel.js";

export const listUsersAction = asyncHandler(async (req, res, next) => {
  const users = await getAllUsers();
  res.status(200).render("admin/manage-users", {
    title: "Manage Users",
    users,
  });
});

export const usersSearchFilterSortAction = asyncHandler(
  async (req, res, next) => {
    const { filteredUsers, page, totalItems, totalPages, limit } =
      await getFilteredUsers(req.query);

    res.json({
      users: filteredUsers,
      pagination: {
        currentPage: page,
        totalItems,
        totalPages,
        limit,
      },
    });
  },
);

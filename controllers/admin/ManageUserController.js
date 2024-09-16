import asyncHandler from "express-async-handler";
import { check, validationResult } from "express-validator";
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
    // SANITIZE QUERY PARAMS
    await Promise.all([
      check("role")
        .optional()
        .trim()
        .customSanitizer((v) => {
          if (!v) return null;
          return v.split(",").map((item) => item.trim().toLowerCase());
        })
        .escape()
        .run(req),
      check("search").optional().trim().toLowerCase().escape().run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { filteredUsers, page, totalItems, totalPages, limit } =
      await getFilteredUsers(req.query);

    return res.json({
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

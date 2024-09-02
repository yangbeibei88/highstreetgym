import asyncHandler from "express-async-handler";
import { getAllClasses } from "../../models/ClassModel.js";

export const listAdminClassesAction = asyncHandler(async (req, res, next) => {
  const [classes] = await getAllClasses();

  res.status(200).render("admin/manage-classes", {
    title: "Manage Classes",
    classes,
  });
});

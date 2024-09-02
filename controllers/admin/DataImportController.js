import asyncHandler from "express-async-handler";

export const listDataImportsActions = asyncHandler(async (req, res, next) => {
  res.status(200).render("admin/data-import", {
    title: "Data Import",
  });
});

import asyncHandler from "express-async-handler";
import { parseXmlFile } from "../../xmlConfigs/xmlHandler.js";
import { mapClassToDB } from "../../xmlConfigs/classMappingConfig.js";
import { upsertClasses } from "../../models/ClassModel.js";

export const listDataImportsAction = asyncHandler(async (req, res, next) => {
  res.status(200).render("admin/data-import", {
    title: "Data Import",
  });
});

export const uploadClassDataAction = asyncHandler(async (req, res, next) => {
  // 1) PARSE XML FILE TO JSDOM
  // const xmlDocument = await parseXmlFile(XML_PATH, "classes");
  console.log(req.file);

  if (!req.file) {
    return res.status(400).render("admin/data-import", {
      title: "Data Import Error",
      error: "No file uploaded or invalid file type.",
    });
  }
  const xmlDocument = await parseXmlFile(req.file.path, "classes");

  // 2) MAP TO DATABASE SCHEMA - ARRAY OF OBJECTS
  const classData = mapClassToDB(xmlDocument);
  console.log(classData);

  // 3) INSERT INTO DATABASE
  const { success, failed, details } = await upsertClasses(classData);

  console.log("Data uploaded successfully");

  res.status(200).render("admin/data-import", {
    title: "Data Import Completed!",
    message: "Data import completed!",
    success,
    failed,
    details,
  });
});

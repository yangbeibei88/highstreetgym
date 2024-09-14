import asyncHandler from "express-async-handler";
import {
  mapToDbSchemaFactory,
  parseAndValidateXMLFactory,
  parseXmlFile,
} from "../../xmlConfigs/xmlHandler.js";
import {
  classMappingConfig,
  classXmlValidationRules,
} from "../../xmlConfigs/classMappingConfig.js";
import { upsertClasses } from "../../models/ClassModel.js";
import { upsertTimetables } from "../../models/TimetableModel.js";
import { mapTimetableToDB } from "../../xmlConfigs/timetableMappingConfig.js";

export const listDataImportsAction = asyncHandler(async (req, res, next) => {
  res.status(200).render("admin/data-import", {
    title: "Data Import",
  });
});

export const validateClassXmlFile = parseAndValidateXMLFactory(
  classXmlValidationRules,
  classMappingConfig,
  "classes",
);

export const uploadClassDataAction = asyncHandler(async (req, res, next) => {
  // 2) MAP TO DATABASE SCHEMA - ARRAY OF OBJECTS
  const classData = await mapToDbSchemaFactory(classMappingConfig)(
    req.validData,
  );

  console.log("classData", classData);
  // 3) INSERT INTO DATABASE
  const { success, failed, details } = await upsertClasses(classData);
  return res.status(200).render("admin/data-import", {
    title: "Data Import Completed!",
    successMsg: "Data import completed!",
    success,
    failed,
    details,
  });
});

// export const uploadClassDataAction = asyncHandler(async (req, res, next) => {
//   // 1) PARSE XML FILE TO JSDOM
//   // console.log(req.file);
//   if (!req.file) {
//     return res.status(400).render("admin/data-import", {
//       title: "Data Import Error",
//       errorMsg: "No file uploaded or invalid file type.",
//     });
//   }
//   const xmlDocument = await parseXmlFile(req.file.path, "classes");

//   // 2) MAP TO DATABASE SCHEMA - ARRAY OF OBJECTS
//   const classData = mapClassToDB(xmlDocument);
//   console.log(classData);

//   // 3) INSERT INTO DATABASE
//   const { success, failed, details } = await upsertClasses(classData);

//   console.log("Data uploaded successfully");

//   return res.status(200).render("admin/data-import", {
//     title: "Data Import Completed!",
//     successMsg: "Data import completed!",
//     success,
//     failed,
//     details,
//   });
// });

export const uploadTimetableDataAction = asyncHandler(
  async (req, res, next) => {
    // let XML_PATH = decodeURIComponent(
    //   new URL("./timetables.xml", import.meta.url).pathname,
    // );

    // if (process.platform === "win32") {
    //   XML_PATH = XML_PATH.substring(1);
    // }

    // const xmlDocument = await parseXmlFile(XML_PATH, "timetables");
    // 1) PARSE XML FILE TO JSDOM
    console.log(req.file);
    if (!req.file) {
      return res.status(400).render("admin/data-import", {
        title: "Data Import Error",
        error: "No file uploaded or invalid file type.",
      });
    }
    const xmlDocument = await parseXmlFile(req.file.path, "timetables");

    // 2) MAP TO DATABASE SCHEMA - ARRAY OF OBJECTS
    const timetableData = mapTimetableToDB(xmlDocument);
    console.log(timetableData);

    // 3) INSERT INTO DATABASE
    const { success, failed, details } = await upsertTimetables(timetableData);

    console.log("Data uploaded successfully");

    return res.status(200).render("admin/data-import", {
      title: "Data Import Completed!",
      successMsg: "Data import completed!",
      success,
      failed,
      details,
    });
  },
);

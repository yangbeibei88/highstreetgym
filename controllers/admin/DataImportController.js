import { URL } from "node:url";
import asyncHandler from "express-async-handler";
import { parseXmlFile } from "../../xmlConfigs/xmlHandler.js";
import { mapClassToDB } from "../../xmlConfigs/classMappingConfig.js";

export const listDataImportsAction = asyncHandler(async (req, res, next) => {
  res.status(200).render("admin/data-import", {
    title: "Data Import",
  });
});

export const uploadClassDataAction = asyncHandler(async (req, res, next) => {
  let XML_PATH = decodeURIComponent(
    new URL("./classes.xml", import.meta.url).pathname,
  );
  if (process.platform === "win32") {
    XML_PATH = XML_PATH.substring(1);
  }
  // 1) PARSE XML FILE TO JSDOM
  const xmlDocument = await parseXmlFile(XML_PATH, "classes");
  // const xmlDocument = await parseXmlFile(req.file.path, "classes");

  // 2) MAP TO DATABASE SCHEMA - ARRAY OF OBJECTS
  const classData = mapClassToDB(xmlDocument);

  console.log(classData);
});

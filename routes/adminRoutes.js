import { Router } from "express";
import { isLoggedIn } from "../controllers/AuthController.js";
import { listAdminClassesAction } from "../controllers/admin/ManageClassController.js";
import {
  listDataImportsAction,
  uploadClassDataAction,
  uploadTimetableDataAction,
} from "../controllers/admin/DataImportController.js";
import { xmlUpload } from "../utils/uploadHandler.js";

export const adminRouter = Router();

adminRouter.use(isLoggedIn);

adminRouter.get("/manage-classes", listAdminClassesAction);
adminRouter.get("/data-import", listDataImportsAction);

adminRouter.post(
  "/data-import/classxml",
  xmlUpload("public/uploads").single("classXmlFile"),
  uploadClassDataAction,
);

adminRouter.post(
  "/data-import/timetablexml",
  xmlUpload("public/uploads").single("timetableXmlFile"),
  uploadTimetableDataAction,
);
// adminRouter.post("/data-import/timetablexml", uploadTimetableDataAction);

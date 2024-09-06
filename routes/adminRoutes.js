import { Router } from "express";
import { isLoggedIn } from "../controllers/AuthController.js";
import {
  listAdminClassesAction,
  saveClassFormAction,
  showClassFormAction,
} from "../controllers/admin/ManageClassController.js";
import {
  listDataImportsAction,
  uploadClassDataAction,
  uploadTimetableDataAction,
} from "../controllers/admin/DataImportController.js";
import { imageUpload, xmlUpload } from "../utils/uploadHandler.js";
import {
  listAdminTimetableAction,
  saveTimetableFormAction,
  showTimetableFormAction,
} from "../controllers/admin/ManageTimetableController.js";
import { listUsersAction } from "../controllers/admin/ManageUserController.js";

export const adminRouter = Router();

adminRouter.use(isLoggedIn);

adminRouter.get("/manage-classes", listAdminClassesAction);
adminRouter.get("/manage-timetable", listAdminTimetableAction);
adminRouter.get("/manage-users", listUsersAction);
adminRouter.get("/data-import", listDataImportsAction);
adminRouter.get("/classForm/create", showClassFormAction);
adminRouter.get("/timetableForm/create", showTimetableFormAction);
adminRouter.get("/classForm/:classId/edit", showClassFormAction);
adminRouter.get("/timetableForm/:timetableId/edit", showTimetableFormAction);

adminRouter.post(
  "/classForm/save",
  imageUpload("public/images/classes").single("imageCover"),
  saveClassFormAction,
);

adminRouter.post("/timetableForm/save", saveTimetableFormAction);

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

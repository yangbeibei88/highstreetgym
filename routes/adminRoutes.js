import { Router } from "express";
import { authorisedTo, protect } from "../controllers/AuthController.js";
import {
  createClassAction,
  listAdminClassesAction,
  showClassFormAction,
  updateClassAction,
  validateClassForm,
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

// adminRouter.use(isLoggedIn);
adminRouter.use(protect, authorisedTo("admin"));

adminRouter.get("/manage-classes", listAdminClassesAction);
adminRouter.get("/manage-timetable", listAdminTimetableAction);
adminRouter.get("/manage-users", listUsersAction);
adminRouter.get("/data-import", listDataImportsAction);
adminRouter.get("/timetableForm/create", showTimetableFormAction);
adminRouter.get("/timetableForm/:timetableId/edit", showTimetableFormAction);

adminRouter
  .route("/classForm/create")
  .get(showClassFormAction)
  .post(
    imageUpload("public/images/classes").single("imageCover"),
    validateClassForm,
    createClassAction,
  );

adminRouter
  .route("/classForm/:classId/edit")
  .get(showClassFormAction)
  .post(
    imageUpload("public/images/classes").single("imageCover"),
    validateClassForm,
    updateClassAction,
  );

// adminRouter.post(
//   "/classForm/save",
//   imageUpload("public/images/classes").single("imageCover"),
//   saveClassFormAction,
// );

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

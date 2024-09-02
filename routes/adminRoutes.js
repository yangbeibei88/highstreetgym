import { Router } from "express";
import { isLoggedIn } from "../controllers/AuthController.js";
import { listAdminClassesAction } from "../controllers/admin/ManageClassController.js";
import { listDataImportsActions } from "../controllers/admin/DataImportController.js";

export const adminRouter = Router();

adminRouter.use(isLoggedIn);

adminRouter.get("/manage-classes", listAdminClassesAction);
adminRouter.get("/data-import", listDataImportsActions);

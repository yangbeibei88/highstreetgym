import { Router } from "express";
import {
  classListAction,
  classShowAction,
} from "../controllers/ClassController.js";
import { isLoggedIn } from "../controllers/AuthController.js";

export const classRouter = Router();

classRouter.use(isLoggedIn);

classRouter.get("/", classListAction);

classRouter.get("/:classId", classShowAction);

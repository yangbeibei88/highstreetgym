import { Router } from "express";
import {
  classListAction,
  classShowAction,
} from "../controllers/ClassController.js";

export const classRouter = Router();

classRouter.get("/", classListAction);

classRouter.get("/:classId", classShowAction);

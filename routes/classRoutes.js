import { Router } from "express";
import { classListAction } from "../controllers/ClassController.js";

export const classRouter = Router();

classRouter.get("/", classListAction);

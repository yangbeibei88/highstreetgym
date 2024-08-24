import { Router } from "express";
import { timetableListAction } from "../controllers/TimetableController.js";

export const timetableRouter = Router();

timetableRouter.get("/", timetableListAction);

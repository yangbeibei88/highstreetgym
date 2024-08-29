import { Router } from "express";
import { timetableListAction } from "../controllers/TimetableController.js";
import { isLoggedIn } from "../controllers/AuthController.js";

export const timetableRouter = Router();

timetableRouter.use(isLoggedIn);

timetableRouter.get("/", timetableListAction);

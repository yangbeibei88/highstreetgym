import { Router } from "express";
import { renderHomeAction } from "../controllers/IndexController.js";
import {
  isLoggedIn,
  renderLoginAction,
  renderSignupAction,
} from "../controllers/AuthController.js";
import {
  classListAction,
  classShowAction,
} from "../controllers/ClassController.js";
import {
  timetableListAction,
  timetableSearchFilterSortAction,
} from "../controllers/TimetableController.js";
import {
  articleListAction,
  articleShowAction,
  blogSearchFilterSortAction,
  limitArticles,
} from "../controllers/ArticleController.js";

export const publicRouter = Router();

publicRouter.use(isLoggedIn);
publicRouter.get("/", renderHomeAction);
publicRouter.get("/login", renderLoginAction);
publicRouter.get("/signup", renderSignupAction);
publicRouter.get("/classes", classListAction);
publicRouter.get("/timetable", timetableListAction);
publicRouter.get("/timetable/search-filter", timetableSearchFilterSortAction);
publicRouter.get("/blog", limitArticles, articleListAction);
publicRouter.get(
  "/blog/search-filter",
  limitArticles,
  blogSearchFilterSortAction,
);

publicRouter.get("/classes/:classId", classShowAction);
publicRouter.get("/blog/:articleId", articleShowAction);

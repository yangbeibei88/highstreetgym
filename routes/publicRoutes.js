import { Router } from "express";
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
  publicArticleRestrict,
} from "../controllers/ArticleController.js";

export const publicRouter = Router();

publicRouter.use(isLoggedIn);
publicRouter.get("/", classListAction);
publicRouter.get("/login", renderLoginAction);
publicRouter.get("/signup", renderSignupAction);
publicRouter.get("/classes", classListAction);
publicRouter.get("/timetable", timetableListAction);
publicRouter.get("/timetable/search-filter", timetableSearchFilterSortAction);
publicRouter.get("/blog", publicArticleRestrict, articleListAction);
publicRouter.get(
  "/blog/search-filter",
  publicArticleRestrict,
  blogSearchFilterSortAction,
);

publicRouter.get("/classes/:classId", classShowAction);
publicRouter.get("/blog/:articleId", articleShowAction);

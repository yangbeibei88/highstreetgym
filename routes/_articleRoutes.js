import { Router } from "express";
import {
  articleListAction,
  articleShowAction,
} from "../controllers/ArticleController.js";
import { isLoggedIn } from "../controllers/AuthController.js";

export const articleRouter = Router();

articleRouter.use(isLoggedIn);

articleRouter.get("/", articleListAction);
articleRouter.get("/:articleId", articleShowAction);

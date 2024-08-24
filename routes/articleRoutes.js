import { Router } from "express";
import {
  articleListAction,
  articleShowAction,
} from "../controllers/ArticleController.js";

export const articleRouter = Router();

articleRouter.get("/", articleListAction);
articleRouter.get("/:articleId", articleShowAction);

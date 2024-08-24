import { Router } from "express";
import { articleListAction } from "../controllers/ArticleController.js";

export const articleRouter = Router();

articleRouter.get("/", articleListAction);

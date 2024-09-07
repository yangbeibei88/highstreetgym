import asyncHandler from "express-async-handler";
import {
  getAllArticles,
  getAllTopics,
  getArticle,
} from "../models/ArticleModel.js";
import { getCommentsByArticle } from "../models/CommentModel.js";
import { AppError } from "../utils/AppError.js";

export const articleListAction = asyncHandler(async (req, res, next) => {
  let articles = await getAllArticles();
  const topics = await getAllTopics();

  // if not loggedin user, only see public articles
  if (!req.user) {
    articles = await articles.filter(
      (article) => article.visibility === "public",
    );
  }

  // if loggedin user, and user's role is trainer or member, can see articles except private and the loggedin user's own articles
  if (req.user && ["trainer", "member"].includes(req.user.userRole)) {
    articles = await articles.filter(
      (article) =>
        article.visibility !== "private" || article.userId === req.user.userId,
    );
  }

  return res.render("blog", {
    title: "Blog",
    articles,
    topics,
  });
});

export const articleShowAction = asyncHandler(async (req, res, next) => {
  const article = await getArticle(+req.params.articleId);
  console.log(article);
  const comments = await getCommentsByArticle(+req.params.articleId);
  if (!article || article.length === 0) {
    return next(new AppError("This article not found", 404));
  }

  const visi = await article[0].visibility;
  const articleAuthorId = await article[0].userId;

  if (!req.user && visi !== "public") {
    return next(
      new AppError("Sorry, you are not authorised for this article.", 403),
    );
  }
  if (
    req.user &&
    req.user.userId !== articleAuthorId &&
    ["trainer", "member"].includes(req.user.userRole) &&
    visi === "private"
  ) {
    return next(
      new AppError("Sorry, you are not authorised for this article.", 403),
    );
  }

  return res.render("article", {
    title: article[0].articleTitle,
    article: article[0],
    comments,
  });
});

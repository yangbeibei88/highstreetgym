import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { sanitizeTextarea } from "../../utils/validation.js";
import { getArticle } from "../../models/ArticleModel.js";
import {
  getAllComments,
  getCommentsByArticle,
  getCommentsByUser,
  insertComment,
} from "../../models/CommentModel.js";
import { AppError } from "../../utils/AppError.js";

export const listAccountCommentsAction = asyncHandler(
  async (req, res, next) => {
    let comments;
    if (req.user.userRole === "admin") {
      comments = await getAllComments();
    } else {
      comments = await getCommentsByUser(req.user.userId);
    }

    res
      .status(200)
      .render("account/manage-comments", { title: "My Comments", comments });
  },
);

export const articleCheck = asyncHandler(async (req, res, next) => {
  let article;
  if (req.params.articleId) {
    article = await getArticle(+req.params.articleId);
    if (!article || article.length === 0) {
      return next(new AppError("This article is not found.", 404));
    }
    const authorId = await article[0].userId;
    const visi = await article[0].visibility;

    if (visi === "private" && req.user.userId !== authorId) {
      return next(
        new AppError(
          "You are not authorised to leave comment on this article.",
          403,
          {
            text: "Back to Previous Article",
            link: req.get("referer") || "/blog",
          },
        ),
      );
    }

    // pop article to an object
    req.article = article.pop();
  }

  next();
});

export const createCommentAction = asyncHandler(async (req, res, next) => {
  // const article = await getArticle(+req.params.articleId);
  const articleId = await req.article.articleId;
  const comments = await getCommentsByArticle(articleId);
  await sanitizeTextarea("comment", 5, 200, true).run(req);

  const errors = validationResult(req);
  console.log(errors);

  const inputData = {
    userId: req.user.userId,
    articleId,
    comment: req.body.comment,
  };
  console.log(inputData);

  if (!errors.isEmpty()) {
    return res.status(400).render("article", {
      title: req.article.articleTitle,
      showHeader: false,
      article: req.article,
      comments,
      inputData,
      errorMsg: errors.array().map((err) => err.msg),
      errors: errors.array(),
    });
  }

  await insertComment(inputData);

  req.session.successMsg = "Comment submitted successfully!🎉";

  return res.redirect(`/blog/${req.article.articleId}`);
});

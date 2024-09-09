import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { sanitizeTextarea } from "../../utils/validation.js";
import { getArticle } from "../../models/ArticleModel.js";
import {
  getAllComments,
  getCommentsByArticle,
  getCommentsByUser,
  saveComment,
} from "../../models/CommentModel.js";

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

export const saveCommentAction = asyncHandler(async (req, res, next) => {
  const article = await getArticle(+req.params.articleId);
  const comments = await getCommentsByArticle(+req.params.articleId);
  await sanitizeTextarea("comment", 5, 200, true).run(req);

  const errors = validationResult(req);
  console.log(errors);

  const inputData = {
    commentId: +req.body.commentId,
    userId: req.user.userId,
    articleId: +req.body.articleId,
    comment: req.body.comment,
  };
  console.log(inputData);

  if (!errors.isEmpty()) {
    return res.status(400).render("article", {
      title: article[0].articleTitle,
      article,
      comments,
      inputData,
      errors: errors.array(),
    });
  }

  await saveComment(inputData);

  return res.redirect(`/blog/${article[0].articleId}`);
});

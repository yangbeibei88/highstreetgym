import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import {
  getAllArticles,
  getArticle,
  getArticlesByUser,
  getTopics,
  getVisibilityOptions,
  saveArticle,
} from "../../models/ArticleModel.js";
import {
  sanitizeRichText,
  validateText,
  validSelect,
} from "../../utils/validation.js";
import { AppError } from "../../utils/AppError.js";
import {
  getCommentsByArticles,
  getCommentsByArticlesByUser,
} from "../../models/CommentModel.js";

export const accountArticleRestrict = asyncHandler(async (req, res, next) => {
  let article;
  if (req.params.articleId) {
    article = await getArticle(+req.params.articleId);
    if (!article || article.length === 0) {
      return next(new AppError("This article is not found.", 404));
    }
    const authorId = await article[0].userId;

    if (req.user.userId !== authorId) {
      return next(
        new AppError("You are not authorised to edit this article.", 403),
      );
    }

    // pop article to an object
    req.article = article.pop();
  }

  next();
});

export const listAccountArticlesAction = async (req, res, next) => {
  let articles;
  let comments;
  let articlesWithComments;
  if (req.user.userRole === "admin") {
    articles = await getAllArticles();
    const articleIds = articles.map((item) => item.articleId);
    comments = await getCommentsByArticles(articleIds);

    articlesWithComments = articles.map((article) => {
      article.comments =
        comments.filter((comment) => comment.articleId === article.articleId) ||
        [];
      // console.log(article.comments);
      return article;
    });

    console.log(articlesWithComments);
  } else {
    articles = await getArticlesByUser(req.user.userId);
    const articleIds = articles.map((item) => item.articleId);
    comments = await getCommentsByArticlesByUser(articleIds, req.user.userId);
    articlesWithComments = articles.map((article) => {
      article.comments =
        comments.filter((comment) => comment.articleId === article.articleId) ||
        [];
      // console.log(article.comments);
      return article;
    });
  }

  // console.log(articles);
  res.status(200).render("account/manage-articles", {
    title: "My Articles",
    articles,
    articlesWithComments,
  });
};

export const showArticleFormAction = asyncHandler(async (req, res, next) => {
  const topics = await getTopics();
  const visibilityOptions = await getVisibilityOptions();
  // INITIALISE THE FORM
  let inputData = {
    articleId: "",
    articleTitle: "",
    topicId: "",
    visibility: "private",
    articleContent: "",
    userId: req.user.userId,
    imageCover: null,
  };

  inputData = await req.article;
  console.log(inputData);

  res.render("account/articleForm", {
    title: req.params.articleId ? "Edit Article" : "Create Article",
    topics,
    visibilityOptions,
    inputData,
  });
});

export const saveArticleAction = asyncHandler(async (req, res, next) => {
  const visibilityOptions = await getVisibilityOptions();
  const topics = await getTopics();
  const topicOptions = topics.map((row) => `${row.topicId}`);
  // const articleId = req.body.articleId ? +req.body.articleId : null;

  // 1) VALIDATE & SANITISE FIELDS
  await Promise.all([
    validateText("articleTitle", 10, 80, true).run(req),
    validSelect("topic", topicOptions, true).run(req),
    validSelect("visibility", visibilityOptions, true).run(req),
    sanitizeRichText("articleContent", 100, 20000, true).run(req),
  ]);

  // 2) EXTRACT ERRORS
  const errors = validationResult(req);
  console.log(errors);

  const inputData = {
    articleId: +req.params.articleId,
    articleTitle: req.body.articleTitle,
    topicId: +req.body.topic,
    visibility: req.body.visibility,
    articleContent: req.body.articleContent,
    userId: req.user.userId,
    imageCover: req.file ? req.file.filename : null,
  };

  console.log(inputData);

  if (!errors.isEmpty() || req.fileValidationError) {
    return res.status(400).render("auth/articleForm", {
      title: req.params.articleId ? "Edit Article" : "Create Article",
      topics,
      visibilityOptions,
      inputData,
      errors: errors.array(),
      uploadErr: req.fileValidationError,
    });
  }

  // INSERT DATA INTO DATABASE IF NO ERR
  const articleObj = await saveArticle(inputData);
  console.log(articleObj);

  // res.redirect("/auth/manage-articles");
  res.redirect(
    `/auth/account/articleForm/${articleObj?.articleId || req.body.articleId}/edit`,
  );
});

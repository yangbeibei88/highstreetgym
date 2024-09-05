import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import {
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
import { articleImageUpload } from "../../utils/uploadHandler.js";
import { AppError } from "../../utils/AppError.js";

export const listAccountArticlesAction = async (req, res, next) => {
  const [articles] = await getArticlesByUser(req.user.userId);
  res
    .status(200)
    .render("account/manage-articles", { title: "My Articles", articles });
};

export const showArticleFormAction = asyncHandler(async (req, res, next) => {
  const [topics] = await getTopics();
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

  // IF IT'S ARTICLE EDIT, CHECK PARAMS ID
  if (req.params.articleId) {
    const [article] = await getArticle(+req.params.articleId);
    if (!article) {
      return next(new AppError("NOT FOUND", 404));
    }
    inputData = await article[0];
  }
  res.render("account/articleForm", {
    title: req.params.articleId ? "Edit Article" : "Create Article",
    topics,
    visibilityOptions,
    inputData,
  });
});

export const saveArticleAction = asyncHandler(async (req, res, next) => {
  const visibilityOptions = await getVisibilityOptions();
  const [topics] = await getTopics();
  const topicOptions = topics.map((row) => `${row.topicId}`);

  // 1) CREATE UPLOAD MULTER IMAGE MIDDLEWARE
  const upload = articleImageUpload(
    req.user.userId,
    "public/images/blog",
  ).single("imageCover");

  // WRAP FORM VALIDATION AND INSERT EXECUTATION IN UPLOAD MIDDLEWARE
  upload(req, res, async () => {
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
      articleId: +req.body.articleId,
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
    await saveArticle(inputData);

    res.redirect("/auth/manage-articles");
  });
});

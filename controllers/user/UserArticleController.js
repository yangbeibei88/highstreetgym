import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import {
  getArticle,
  getArticlesByUser,
  getTopics,
  getVisibilityOptions,
  insertArticle,
} from "../../models/ArticleModel.js";
import {
  sanitizeRichText,
  validateText,
  validSelect,
} from "../../utils/validation.js";
import { articleImageUpload } from "../UploadController.js";
import { AppError } from "../../utils/AppError.js";

export const listMyArticlesAction = async (req, res, next) => {
  const [articles] = await getArticlesByUser(req.user.userId);
  res
    .status(200)
    .render("user/my-articles", { title: "My Articles", articles });
};

export const showCreateArticleFormAction = asyncHandler(
  async (req, res, next) => {
    const [topics] = await getTopics();
    const visibilityOptions = await getVisibilityOptions();
    res.render("user/articleForm", {
      title: "Create Article",
      topics,
      visibilityOptions,
    });
  },
);

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
      articleTitle: req.body.articleTitle,
      topicId: +req.body.topic,
      visibility: req.body.visibility,
      articleContent: req.body.articleContent,
      userId: req.user.userId,
      imageCover: req.file ? req.file.filename : null,
    };

    console.log(inputData);

    if (!errors.isEmpty() || req.fileValidationError) {
      return res.status(400).render("user/articleForm", {
        title: "Create Article",
        topics,
        visibilityOptions,
        inputData,
        errors: errors.array(),
        uploadErr: req.fileValidationError,
      });
    }

    // INSERT DATA INTO DATABASE IF NO ERR
    const newArticleData = await insertArticle(inputData);

    res.redirect(
      `/auth/${req.user.userRole === "admin" ? "admin" : "user"}/my-articles`,
    );
  });
});

export const showEditArticleAction = asyncHandler(async (req, res, next) => {
  const [article] = await getArticle(+req.params.articleId);

  if (!article) {
    return next(new AppError("NOT FOUND", 404));
  }

  const inputData = await article[0];
  const [topics] = await getTopics();
  const visibilityOptions = await getVisibilityOptions();

  res.render("user/articleForm", {
    title: "Edit Article",
    inputData,
    topics,
    visibilityOptions,
  });
});

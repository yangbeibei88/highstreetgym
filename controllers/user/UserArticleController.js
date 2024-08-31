import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { getTopics, getVisibilityOptions } from "../../models/ArticleModel.js";
import {
  sanitizeRichText,
  validateText,
  validSelect,
} from "../../utils/validation.js";
import { articleImageUpload } from "../UploadController.js";

export const renderMyarticlesAction = async (req, res, next) => {
  res.status(200).render("user/my-articles", { title: "My Articles" });
};

export const showCreateArticleFormAction = asyncHandler(
  async (req, res, next) => {
    const [topics] = await getTopics();
    const visibilityOptions = await getVisibilityOptions();
    res.render("user/create-article", {
      title: "Create Article",
      topics,
      visibilityOptions,
    });
  },
);

export const createArticleAction = asyncHandler(async (req, res, next) => {
  const visibilityOptions = await getVisibilityOptions();
  const [topics] = await getTopics();
  const topicOptions = topics.map((row) => `${row.topicId}`);

  const upload = articleImageUpload(
    req.user.userId,
    "public/images/blog",
  ).single("imageCover");

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

    const cleanData = {
      articleTitle: req.body.articleTitle,
      topicId: +req.body.topic,
      visibility: req.body.visibility,
      articleContent: req.body.articleContent,
      userId: req.user.userId,
      imageCover: req.file ? req.file.filename : null,
    };

    console.log(cleanData);

    if (!errors.isEmpty() || req.fileValidationError) {
      return res.status(400).render("user/create-article", {
        title: "Create Article",
        topics,
        visibilityOptions,
        cleanData,
        errors: errors.array(),
        uploadErr: req.fileValidationError,
      });
    }

    res.status(200).redirect("/");
  });
});

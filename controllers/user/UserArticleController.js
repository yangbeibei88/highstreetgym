import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { getTopics } from "../../models/ArticleModel.js";
import { validateText, validSelect } from "../../utils/validation.js";

export const renderMyarticlesAction = async (req, res, next) => {
  res.status(200).render("user/my-articles", { title: "My Articles" });
};

export const showCreateArticleFormAction = asyncHandler(
  async (req, res, next) => {
    const [topics] = await getTopics();
    res.render("user/create-article", {
      title: "Create Article",
      topics,
    });
  },
);

export const createArticleAction = asyncHandler(async (req, res, next) => {
  const newData = {
    articleTitle: req.body.articleTitle,
    topicId: req.body.topic,
    visibility: req.body.visibility,
    articleContent: req.body.articleContent,
    imageCover: req.body.imageCover,
    userId: req.user.userId,
  };

  // 1) VALIDATE & SANITISE FIELDS
  const visibilityOptions = ["private", "member-only", "public"];
  const [topics] = await getTopics();
  const topicOptions = topics.map((row) => `${row.topicId}`);
  await Promise.all([
    validateText("articleTitle", 10, 80, true).run(req),
    validSelect("topic", topicOptions, true).run(req),
    validSelect("visibility", visibilityOptions, true).run(req),
    validateText("articleContent", 100, 20000, true).run(req),
  ]);

  // 2) EXTRACT ERRORS
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).render("user/create-article", {
      title: "Create Article",
      topics,
      errors: errors.array(),
    });
  }
});

import asyncHandler from "express-async-handler";
import { getTopics } from "../../models/ArticleModel.js";

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
  };
});

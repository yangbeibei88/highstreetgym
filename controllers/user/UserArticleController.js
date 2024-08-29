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

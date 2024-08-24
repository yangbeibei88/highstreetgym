import { getAllArticles, getAllTopics } from "../models/ArticleModel.js";

export const articleListAction = async (req, res) => {
  try {
    const [articles] = await getAllArticles();
    const [topics] = await getAllTopics();
    res.render("blog", {
      title: "Blog",
      articles,
      topics,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

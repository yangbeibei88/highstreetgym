import {
  getAllArticles,
  getAllTopics,
  getArticle,
} from "../models/ArticleModel.js";
import { getCommentsByArticle } from "../models/CommentModel.js";

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

export const articleShowAction = async (req, res) => {
  try {
    const [article] = await getArticle(+req.params.articleId);
    const [comments] = await getCommentsByArticle(+req.params.articleId);
    res.render("article", {
      title: article[0].articleTitle,
      article,
      comments,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

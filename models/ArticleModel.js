import { pool } from "../config/db.js";

const dbPool = await pool();

export const getVisibilityOptions = async () => [
  "private",
  "member-only",
  "public",
];

export const getAllArticles = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT a.*, t.topicName, u.firstName, u.lastName, u.avatar, COUNT(c.articleId) AS commentCount FROM articles a INNER JOIN topics t ON a.topicId = t.topicId INNER JOIN users u ON a.userId = u.userId LEFT JOIN comments c ON a.articleId = c.articleId GROUP BY a.articleId ORDER BY a.createdAt DESC";
    const [rows] = await conn.execute(sql);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getArticlesByVsibility = async (visibility) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT a.*, t.topicName, u.firstName, u.lastName, u.avatar FROM articles a INNER JOIN topics t ON a.topicId = t.topicId INNER JOIN users u ON a.userId = u.userId ORDER BY a.createdAt DESC WHERE visibility = ?";
    return conn.execute(sql, [visibility]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getArticle = async (id) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT a.*, t.topicName, u.firstName, u.lastName, u.avatar FROM articles a INNER JOIN topics t ON a.topicId = t.topicId INNER JOIN users u ON a.userId = u.userId WHERE a.articleId = ?";
    const [row] = await conn.execute(sql, [id]);
    return row;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getArticlesByUser = async (userId) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT a.*, t.topicName, u.firstName, u.lastName, u.avatar, COUNT(c.articleId) AS commentCount FROM articles a INNER JOIN topics t ON a.topicId = t.topicId INNER JOIN users u ON a.userId = u.userId LEFT JOIN comments c ON a.articleId = c.articleId WHERE a.userId = ? GROUP BY a.articleId ORDER BY a.createdAt DESC";
    const [rows] = await conn.execute(sql, [userId]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getAllTopics = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT t.*, COUNT(a.topicId) AS count FROM topics t LEFT JOIN articles a ON t.topicId = a.topicId GROUP BY t.topicId ORDER BY t.topicName";
    const [rows] = await conn.execute(sql);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

// FOR ARTICLE FORM
export const getTopics = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM topics ORDER BY topicName";
    const [rows] = await conn.execute(sql);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const insertArticle = async (article) => {
  const conn = await dbPool.getConnection();
  try {
    const fieldNames = [
      "articleTitle",
      "topicId",
      "visibility",
      "articleContent",
      "userId",
    ];
    const values = [
      article.articleTitle,
      article.topicId,
      article.visibility,
      article.articleContent,
      article.userId,
    ];
    if (article.imageCover) {
      fieldNames.push("imageCover");
      values.push(article.imageCover);
    }

    const fieldValues = Array(fieldNames.length).fill("?");

    const sql = `INSERT INTO articles (${fieldNames.join(", ")}) VALUES (${fieldValues.join(", ")})`;
    const [result] = await conn.execute(sql, [...values]);
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    return { ...article, articleId: result.insertId };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const updateArticle = async (article) => {
  const conn = await dbPool.getConnection();
  try {
    const setFields = [
      "articleTitle = ?",
      "topicId = ?",
      "visibility = ?",
      "articleContent = ?",
      "userId = ?",
    ];
    const values = [
      article.articleTitle,
      article.topicId,
      article.visibility,
      article.articleContent,
      article.userId,
    ];
    if (article.imageCover) {
      setFields.push("imageCover = ?");
      values.push(article.imageCover);
    }

    const sql = `UPDATE articles SET ${setFields.join(", ")} WHERE articleId = ?`;
    return await conn.execute(sql, [...values, article.articleId]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const saveArticle = async (article) => {
  try {
    if (!article.articleId) {
      return await insertArticle(article);
    }
    return await updateArticle(article);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

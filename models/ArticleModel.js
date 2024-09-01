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
      "SELECT a.*, t.topicName, u.firstName, u.lastName, u.avatar FROM articles a INNER JOIN topics t ON a.topicId = t.topicId INNER JOIN users u ON a.userId = u.userId ORDER BY a.createdAt DESC";
    return conn.execute(sql);
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
    return await conn.execute(sql, [id]);
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
      "SELECT a.*, t.topicName, u.firstName, u.lastName, u.avatar FROM articles a INNER JOIN topics t ON a.topicId = t.topicId INNER JOIN users u ON a.userId = u.userId WHERE a.userId = ? ORDER BY a.createdAt DESC";
    return await conn.execute(sql, [userId]);
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
    return await conn.execute(sql);
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
    return await conn.execute(sql);
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
    const fieldValues = Array(fieldNames.length).fill("?");
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

    const sql = `INSERT INTO articles ${fieldNames.join(", ")} VALUES ${fieldValues.join(", ")}`;
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

    values.push(article.articleId);

    const sql = `UPDATE articles SET ${setFields.join(", ")} WHERE articleId = ?`;
    return await conn.execute(sql, [...values]);
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

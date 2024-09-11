import { pool } from "../config/db.js";

const dbPool = await pool();

export const getAllComments = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT c.*, u1.firstName, u1.lastName, u1.avatar, u1.userRole, u2.firstName AS authorFirstName, u2.lastName AS authorLastName, u2.userRole AS authorUserRole, a.articleTitle FROM comments c INNER JOIN articles a ON c.articleId = a.articleId INNER JOIN users u1 ON c.userId = u1.userId INNER JOIN users u2 ON a.userId = u2.userId ORDER BY c.createdAt DESC";
    const [rows] = await conn.execute(sql);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getCommentsByArticle = async (id) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT c.*, u1.firstName, u1.lastName, u1.avatar, u1.userRole, u2.firstName AS authorFirstName, u2.lastName AS authorLastName, u2.userRole AS authorUserRol, a.articleTitle FROM comments c INNER JOIN articles a ON c.articleId = a.articleId INNER JOIN users u1 ON c.userId = u1.userId INNER JOIN users u2 ON a.userId = u2.userId WHERE c.articleId = ? ORDER BY c.createdAt DESC";
    const [rows] = await conn.execute(sql, [id]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getCommentsByArticles = async (articleIds) => {
  const conn = await dbPool.getConnection();
  try {
    const placeholders = articleIds.map(() => "?").join(",");
    const sql = `SELECT c.*, u1.firstName, u1.lastName, u1.avatar, u1.userRole, u2.firstName AS authorFirstName, u2.lastName AS authorLastName, u2.userRole AS authorUserRole, a.articleTitle FROM comments c RIGHT JOIN articles a ON c.articleId = a.articleId INNER JOIN users u1 ON c.userId = u1.userId INNER JOIN users u2 ON a.userId = u2.userId WHERE c.articleId IN (${placeholders}) ORDER BY c.createdAt DESC`;
    const [rows] = await conn.execute(sql, articleIds);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getCommentsByUser = async (userId) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT c.*, u1.firstName, u1.lastName, u1.avatar, u1.userRole, u2.firstName AS authorFirstName, u2.lastName AS authorLastName, u2.userRole AS authorUserRole, a.articleTitle FROM comments c INNER JOIN articles a ON c.articleId = a.articleId INNER JOIN users u1 ON c.userId = u1.userId INNER JOIN users u2 ON a.userId = u2.userId WHERE c.userId = ? ORDER BY c.createdAt DESC";
    const [rows] = await conn.execute(sql, [userId]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getCommentsByArticlesByUser = async (articleIds, userId) => {
  const conn = await dbPool.getConnection();
  try {
    const placeholders = articleIds.map(() => "?").join(",");
    const sql = `SELECT c.*, u1.firstName, u1.lastName, u1.avatar, u1.userRole, u2.firstName AS authorFirstName, u2.lastName AS authorLastName, u2.userRole AS authorUserRole, a.articleTitle FROM comments c RIGHT JOIN articles a ON c.articleId = a.articleId INNER JOIN users u1 ON c.userId = u1.userId INNER JOIN users u2 ON a.userId = u2.userId WHERE c.articleId IN (${placeholders}) AND a.userId = ? ORDER BY c.createdAt DESC`;
    const [rows] = await conn.execute(sql, [articleIds, userId].flat());
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const insertComment = async (newComment) => {
  const conn = await dbPool.getConnection();
  try {
    const fieldNames = ["userId", "articleId", "comment"];
    const sql = `INSERT INTO comments (${fieldNames.join(", ")}) VALUES (?, ?, ?)`;
    return await conn.execute(sql, [
      newComment.userId,
      newComment.articleId,
      newComment.comment,
    ]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const updateComment = async (comment) => {
  const conn = await dbPool.getConnection();
  try {
    const sql = `UPDATE comments SET comment = ? WHERE commentId = ?`;
    return await conn.execute(sql, [comment.comment, comment.commentId]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const saveComment = async (comment) => {
  try {
    if (comment.commentId) {
      return await updateComment(comment);
    }
    return await insertComment(comment);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

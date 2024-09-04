import { pool } from "../config/db.js";

const dbPool = await pool();

export const getCommentsByArticle = async (id) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT c.*, u.firstName, u.lastName, u.avatar, u.userRole FROM comments c INNER JOIN articles a ON c.articleId = a.articleId INNER JOIN users u ON c.userId = u.userId WHERE c.articleId = ? ORDER BY c.createdAt DESC";
    return await conn.execute(sql, [id]);
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

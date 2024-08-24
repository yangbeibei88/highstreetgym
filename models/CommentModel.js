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

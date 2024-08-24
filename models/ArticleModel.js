import { pool } from "../config/db.js";

const dbPool = await pool();

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

export const getAllTopics = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT t.*, COUNT(a.topicId) AS count FROM topics t LEFT JOIN articles a ON t.topicId = a.topicId GROUP BY t.topicId ORDER BY t.topicName";
    return conn.execute(sql);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

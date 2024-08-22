import { pool } from "../config/db.js";

const getPool = await pool();

export const getAllClasses = async () => {
  const conn = await getPool.getConnection();
  try {
    const sql = "SELECT * FROM `classes`";
    return await conn.execute(sql);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

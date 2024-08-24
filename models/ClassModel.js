import { pool } from "../config/db.js";

const dbPool = await pool();

export const getAllClasses = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM classes";
    return await conn.execute(sql);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getClass = async (id) => {
  const conn = await dbPool.getConnection();
  // TODO: two parts: class & timetable
  try {
    const sql = "SELECT * FROM classes WHERE classId = ?";
    return await conn.execute(sql, [id]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

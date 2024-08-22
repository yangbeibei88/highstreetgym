import { pool } from "../config/db.js";

const dbPool = await pool();

export const getAllClasses = async () => {
  const conn = await dbPool.getConnection();
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

export const getClass = async (id) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT cl.*, tt.*, u.firstName, u.lastName FROM classes cl INNER JOIN timetables tt ON cl.classId = tt.classId INNER JOIN users u ON u.userId = tt.trainerId WHERE cl.classId = ? ORDER BY tt.startDateTime";
    return await conn.execute(sql, [id]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

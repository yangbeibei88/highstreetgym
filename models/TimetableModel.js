import { pool } from "../config/db.js";

const dbPool = await pool();

export const getAllTimetables = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT tt.*, cl.className, u.firstName AS trainerFirstName, u.lastName AS trainerLastName FROM classes cl INNER JOIN timetables tt ON cl.classId = tt.classId INNER JOIN users u ON u.userId = tt.trainerId WHERE tt.startDateTime >= CURRENT_TIMESTAMP() ORDER BY tt.startDateTime";
    return await conn.execute(sql);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getClassTimetable = async (id) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT tt.*, cl.className, u.firstName AS trainerFirstName, u.lastName AS trainerLastName FROM classes cl INNER JOIN timetables tt ON cl.classId = tt.classId INNER JOIN users u ON u.userId = tt.trainerId WHERE (tt.classId = ? AND tt.startDateTime >= CURRENT_TIMESTAMP()) ORDER BY tt.startDateTime";
    return await conn.execute(sql, [id]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

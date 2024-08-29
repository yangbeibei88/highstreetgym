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

export const getTimetableByClassId = async (classId) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT tt.*, cl.className, u.firstName AS trainerFirstName, u.lastName AS trainerLastName FROM classes cl INNER JOIN timetables tt ON cl.classId = tt.classId INNER JOIN users u ON u.userId = tt.trainerId WHERE (tt.classId = ? AND tt.startDateTime >= CURRENT_TIMESTAMP()) ORDER BY tt.startDateTime";
    return await conn.execute(sql, [classId]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getTimetableById = async (timetableId) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT tt.*, cl.className, u.firstName AS trainerFirstName, u.lastName AS trainerLastName FROM classes cl INNER JOIN timetables tt ON cl.classId = tt.classId INNER JOIN users u ON u.userId = tt.trainerId WHERE (tt.timetableId = ? AND tt.startDateTime >= CURRENT_TIMESTAMP())";
    return await conn.execute(sql, [timetableId]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getTimetableByUserId = async (userId) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT tt.timetableId, b.bookingId, u.userId FROM timetables tt INNER JOIN bookings b ON tt.timetableId = b.timetableId INNER JOIN users u ON u.userId = b.userId WHERE u.userId = ?";
    return await conn.execute(sql, [userId]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

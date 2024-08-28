import { pool } from "../config/db.js";

const dbPool = await pool();

export const getAllBookings = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT b.*, u1.firstName AS userFirstName, u1.lastName AS userLastName, tt.startDateTime, tt.duration, tt.level, c.className, u2.firstName AS trainerFirstName, u2.lastName AS trainerLastName FROM bookings b INNER JOIN users u1 ON b.userId = u1.userId INNER JOIN timetables tt ON b.timetableId = tt.timetableId INNER JOIN classes c ON tt.classId = c.classId INNER JOIN users u2 ON tt.trainerId = u2.userId";
    return conn.execute(sql);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getBookingByUser = async (userId) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT b.*, u1.firstName AS userFirstName, u1.lastName AS userLastName, tt.startDateTime, tt.duration, tt.level, c.className, u2.firstName AS trainerFirstName, u2.lastName AS trainerLastName FROM bookings b INNER JOIN users u1 ON b.userId = u1.userId INNER JOIN timetables tt ON b.timetableId = tt.timetableId INNER JOIN classes c ON tt.classId = c.classId INNER JOIN users u2 ON tt.trainerId = u2.userId WHERE b.userId = ?";
    return conn.execute(sql, [userId]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

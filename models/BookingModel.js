import { pool } from "../config/db.js";

const dbPool = await pool();

export const getAllBookings = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT b.*, u1.firstName AS userFirstName, u1.lastName AS userLastName, tt.startDateTime, tt.duration, tt.level, c.className, u2.firstName AS trainerFirstName, u2.lastName AS trainerLastName FROM bookings b INNER JOIN users u1 ON b.userId = u1.userId INNER JOIN timetables tt ON b.timetableId = tt.timetableId INNER JOIN classes c ON tt.classId = c.classId INNER JOIN users u2 ON tt.trainerId = u2.userId ORDER BY b.createdAt DESC";
    return await conn.execute(sql);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getBookingById = async (bookingId) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT b.*, u1.firstName AS userFirstName, u1.lastName AS userLastName, tt.startDateTime, tt.duration, tt.level, c.className, u2.firstName AS trainerFirstName, u2.lastName AS trainerLastName FROM bookings b INNER JOIN users u1 ON b.userId = u1.userId INNER JOIN timetables tt ON b.timetableId = tt.timetableId INNER JOIN classes c ON tt.classId = c.classId INNER JOIN users u2 ON tt.trainerId = u2.userId WHERE b.bookingId = ? ORDER BY b.createdAt DESC";
    return await conn.execute(sql, [bookingId]);
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
    return await conn.execute(sql, [userId]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

// DON'T USE THIS, USET TRASACTION
export const insertBooking = async (booking) => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "INSERT INTO bookings (timetableId, userId) VALUES (?, ?)";
    const [result] = await conn.execute(sql, [
      booking.timetableId,
      booking.userId,
    ]);

    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    return { ...result, bookingId: result.insertId };
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
};

export const getCapacityById = async (timetableId) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT timetableId, capacity FROM timetables WHERE timetableId = ?";
    return await conn.execute(sql, [timetableId]);
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
};

export const getBookingCountById = async (timetableId) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "SELECT tt.timetableId, count(b.timetableId) AS bookingCount FROM timetables tt INNER JOIN bookings b ON tt.timetableId = b.timetableId WHERE b.timetableId = ?";
    return await conn.execute(sql, [timetableId]);
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
};

export const insertBookingTrans = async (booking) => {
  const conn = await dbPool.getConnection();
  try {
    // 1) BEGAIN TRANSACTION
    await conn.beginTransaction();

    const sql1 = "INSERT INTO bookings (timetableId, userId) VALUES (?, ?)";
    const getCapacity =
      "SELECT timetableId, capacity FROM timetables WHERE timetableId = ?";
    const getBookingCount =
      "SELECT tt.timetableId, COUNT(b.timetableId) AS bookingCount FROM timetables tt INNER JOIN bookings b ON tt.timetableId = b.timetableId WHERE b.timetableId = ?";
    const sql2 = "UPDATE timetables SET availability = ? WHERE timetableId = ?";

    // 2.1) EXECUTE INSERT NEW BOOKING TO BOOKINGS TABLE
    const [newBooking] = await conn.execute(sql1, [
      booking.timetableId,
      booking.userId,
    ]);
    const [capacityResult] = await conn.execute(getCapacity, [
      booking.timetableId,
    ]);
    const [bookingCountResult] = await conn.execute(getBookingCount, [
      booking.timetableId,
    ]);

    // 2.2) EXECUTE AVAILABILITY UPDATE TO TIMETABLES TABLE
    await conn.execute(sql2, [
      capacityResult[0].capacity - bookingCountResult[0].bookingCount,
      booking.timetableId,
    ]);

    // 3) COMMIT TRANSACTION IF ALL QUERIES EXECUTED SUCCESSFULLY
    await conn.commit();
    console.log("TRANSACTION COMMITTED SUCCESSFULLY!");
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    return { ...booking, bookingId: newBooking.insertId };
  } catch (error) {
    // 4) ROLLBACK TRANSACTION IF ANY ERROR
    await conn.rollback();
    console.error("TRANSACTION ROLLBACK ERROR: ", error);
  } finally {
    conn.release();
  }
};

export const generateBookingNo = async (bookingId) => {
  const conn = await dbPool.getConnection();
  try {
    const setField =
      "bookingNo = CONCAT_WS('-', REPLACE(DATE(createdAt), '-', ''), bookingId)";
    const sql = `UPDATE bookings SET ${setField} WHERE bookingId = ?`;
    // const bookingNoFormula = `CONCAT_WS('-', REPLACE(DATE(${booking.createdAt}), '-', ''), ${booking.bookingId})`;
    return await conn.execute(sql, [bookingId]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

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

export const upsertTimetables = async (xmlData) => {
  const conn = await dbPool.getConnection();
  try {
    const fieldNames = [
      "timetableNo",
      "classCode",
      "trainerEmail",
      "startDateTime",
      "duration",
      "level",
      "capacity",
    ];

    const onUpdates = [
      "classCode = VALUES(classCode)",
      "trainerEmail = VALUES(trainerEmail)",
      "startDateTime = VALUES(startDateTime)",
      "duration = VALUES(duration)",
      "level = VALUES(level)",
      "capacity = VALUES(capacity)",
    ];

    const failedRows = [];

    await Promise.all(
      xmlData.map(async (row) => {
        try {
          const sql = `INSERT INTO timetables (${fieldNames.join(", ")}) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE ${onUpdates.join(", ")}`;

          const values = [
            row.timetableNo,
            row.classCode,
            row.trainerEmail,
            row.startDateTime,
            row.duration / 60,
            row.level,
            row.capacity,
          ];

          await conn.execute(sql, values);
        } catch (error) {
          failedRows.push({ success: false, row, error });
        }
      }),
    );

    if (failedRows.length > 0) {
      console.log("failed rows: ", failedRows);
    }

    return {
      success: xmlData.length - failedRows.length,
      failed: failedRows ? failedRows.length : 0,
      details: fieldNames
        .join()
        .concat(
          "\n",
          failedRows
            .map((obj, idx) => `line ${idx}: ${Object.values(obj)}`)
            .join(";\n"),
        ),
    };
  } catch (error) {
    console.error("Critical error during import", error);
    throw error;
  } finally {
    conn.release();
  }
};

import { pool } from "../config/db.js";

const dbPool = await pool();

export const getAllTimetables = async (includeBefore = false) => {
  const conn = await dbPool.getConnection();
  try {
    const timeCondition =
      includeBefore === true
        ? ""
        : "WHERE tt.startDateTime >= CURRENT_TIMESTAMP()";
    const sql = `SELECT tt.*, cl.className, u.firstName AS trainerFirstName, u.lastName AS trainerLastName FROM classes cl INNER JOIN timetables tt ON cl.classId = tt.classId INNER JOIN users u ON u.userId = tt.trainerId ${timeCondition} ORDER BY tt.startDateTime`;
    const [rows] = await conn.execute(sql);
    return rows;
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
    const [rows] = await conn.execute(sql, [classId]);
    return rows;
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
      "SELECT tt.*, cl.className, u.firstName AS trainerFirstName, u.lastName AS trainerLastName FROM classes cl INNER JOIN timetables tt ON cl.classId = tt.classId INNER JOIN users u ON u.userId = tt.trainerId WHERE (tt.timetableId = ?)";

    // date condition: AND tt.startDateTime >= CURRENT_TIMESTAMP()
    const [rows] = await conn.execute(sql, [timetableId]);
    return rows;
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
    const [rows] = await conn.execute(sql, [userId]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const insertTimetable = async (timetable) => {
  const conn = await dbPool.getConnection();
  try {
    const fieldNames = [
      "timetableNo",
      "classId",
      "trainerId",
      "startDateTime",
      "duration",
      "level",
      "capacity",
    ];
    const values = [
      timetable.timetableNo,
      timetable.classId,
      timetable.trainerId,
      timetable.startDateTime,
      timetable.duration,
      timetable.level,
      timetable.capacity,
    ];

    const placeholders = Array(fieldNames.length).fill("?");
    const sql = `INSERT INTO timetables (${fieldNames.join(", ")}) VALUES (${placeholders.join(", ")})`;
    const [result] = await conn.execute(sql, values);
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    return { ...timetable, timetableId: result.insertId };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const updateTimetable = async (timetable) => {
  const conn = await dbPool.getConnection();
  try {
    const setFields = [
      "classId = ?",
      "trainerId = ?",
      "startDateTime = ?",
      "duration = ?",
      "level = ?",
      "capacity = ?",
    ];
    const values = [
      timetable.classId,
      timetable.trainerId,
      timetable.startDateTime,
      timetable.duration,
      timetable.level,
      timetable.capacity,
    ];

    const sql = `UPDATE timetables SET ${setFields.join(", ")} WHERE timetableId = ?`;
    await conn.execute(sql, [...values, timetable.timetableId]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const saveTimetable = async (tt) => {
  try {
    if (!tt.timetableId) {
      return await insertTimetable(tt);
    }
    return await updateTimetable(tt);
  } catch (error) {
    console.log(error);
    throw error;
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

export const getTimetableByNo = async (timetableNo) => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM timetables WHERE timetableNo = ?";
    const [rows] = await conn.execute(sql, [timetableNo]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getLevels = async () => ["beginner", "intermediate", "advanced"];

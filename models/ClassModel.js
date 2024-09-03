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

export const upsertClasses = async (xmlData) => {
  const conn = await dbPool.getConnection();
  try {
    const fieldNames = [
      "classCode",
      "className",
      "shortDesc",
      "longDesc",
      "imageCover",
      "durationRange",
      "days",
    ];

    const onUpdates = [
      "className = VALUES(className)",
      "shortDesc = VALUES(shortDesc)",
      "longDesc = VALUES(longDesc)",
      "imageCover = VALUES(imageCover)",
      "durationRange = VALUES(durationRange)",
      "days = VALUES(days)",
    ];

    // const oneRowValues = `(${Array(fieldNames.length).fill("?").join(", ")})`;
    // const multipleRowValues = Array(xmlData.length).fill(oneRowValues);

    const failedRows = [];

    await Promise.all(
      xmlData.map(async (row) => {
        try {
          const sql = `INSERT INTO classes (${fieldNames.join(", ")}) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE ${onUpdates.join(", ")}`;
          const values = [
            row.classCode,
            row.className,
            row.shortDesc,
            row.longDesc,
            row.imageCover,
            row.durationRange,
            row.days.join(","),
          ];
          await conn.execute(sql, values);
        } catch (error) {
          failedRows.push({ success: false, row, error });
        }
      }),
    );

    if (failedRows.length > 0) {
      console.log("failed rows:", failedRows);
    }

    return {
      success: xmlData.length - failedRows.length,
      failed: failedRows ? failedRows.length : 0,
      details: failedRows,
    };
  } catch (error) {
    console.error("Critical error during import", error);
    throw error;
  } finally {
    conn.release();
  }
};

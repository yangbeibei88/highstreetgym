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

export const insertClasses = async (xmlData) => {
  const conn = await dbPool.getConnection();
  try {
    const fieldNames = [
      "classId",
      "className",
      "shortDesc",
      "longDesc",
      "imageCover",
      "durationRange",
      "days",
    ];

    // const oneRowValues = `(${Array(fieldNames.length).fill("?").join(", ")})`;
    // const multipleRowValues = Array(xmlData.length).fill(oneRowValues);

    const sql = `INSERT INTO classes (${fieldNames.join(", ")}) VALUES ?`;
    const values = xmlData.map((row) => [
      row.classId,
      row.className,
      row.shortDesc,
      row.longDesc,
      row.imageCover,
      row.durationRange,
      row.days,
    ]);
    return await conn.execute(sql, [values]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

// export const getClassTableColumns = async () => {
//   const conn = await dbPool.getConnection();
//   try {
//     const sql = "SHOW COLUMNS FROM classes";
//     return await conn.execute(sql);
//   } catch (error) {
//     console.log(error);
//     throw error;
//   } finally {
//     conn.release();
//   }
// };

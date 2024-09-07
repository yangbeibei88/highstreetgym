import { pool } from "../config/db.js";

const dbPool = await pool();

export const getDayOptions = async () => [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
];

export const getAllClasses = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM classes";
    const [rows] = await conn.execute(sql);
    return rows;
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

export const insertClass = async (course) => {
  const conn = await dbPool.getConnection();
  try {
    const fieldNames = [
      "classCode",
      "className",
      "shortDesc",
      "longDesc",
      "minDuration",
      "maxDuration",
      "days",
    ];

    const values = [
      course.classCode,
      course.className,
      course.shortDesc,
      course.longDesc,
      course.minDuration,
      course.maxDuration,
      course.days.join(","),
    ];

    if (course.imageCover) {
      fieldNames.push("imageCover");
      values.push(course.imageCover);
    }

    const placehoders = Array(fieldNames.length).fill("?");
    const sql = `INSERT INTO classes (${fieldNames.join(", ")}) VALUES (${placehoders.join(", ")})`;
    const [result] = await conn.execute(sql, values);
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    return { ...course, classId: result.insertId };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const updateClass = async (course) => {
  const conn = await dbPool.getConnection();
  try {
    const setFields = [
      "className = ?",
      "shortDesc = ?",
      "longDesc = ?",
      "minDuration = ?",
      "maxDuration = ?",
      "days = ?",
    ];

    const values = [
      course.className,
      course.shortDesc,
      course.longDesc,
      course.minDuration,
      course.maxDuration,
      course.days.join(","),
    ];

    if (course.imageCover) {
      setFields.push("imageCover = ?");
      values.push(course.imageCover);
    }

    const sql = `UPDATE classes SET ${setFields.join(", ")} WHERE classId = ?`;
    await conn.execute(sql, [...values, course.classId]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const saveClass = async (course) => {
  try {
    if (!course.classId) {
      return await insertClass(course);
    }

    return await updateClass(course);
  } catch (error) {
    console.log(error);
    throw error;
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
      "minDuration",
      "maxDuration",
      "days",
    ];

    const onUpdates = [
      "className = VALUES(className)",
      "shortDesc = VALUES(shortDesc)",
      "longDesc = VALUES(longDesc)",
      "minDuration = VALUES(minDuration)",
      "maxDuration = VALUES(maxDuration)",
      "days = VALUES(days)",
    ];

    // const oneRowValues = `(${Array(fieldNames.length).fill("?").join(", ")})`;
    // const multipleRowValues = Array(xmlData.length).fill(oneRowValues);

    const failedRows = [];

    await Promise.all(
      xmlData.map(async (row) => {
        try {
          const values = [
            row.classCode,
            row.className,
            row.shortDesc,
            row.longDesc,
            row.minDuration / 60,
            row.maxDuration / 60,
            row.days.join(","),
          ];
          if (row.imageCover) {
            fieldNames.push("imageCover");
            onUpdates.push("imageCover = VALUES(imageCover)");
            values.push(row.imageCover);
          }
          const placeHolders = Array(fieldNames.length).fill("?");
          const sql = `INSERT INTO classes (${fieldNames.join(", ")}) VALUES ${placeHolders.join(", ")} ON DUPLICATE KEY UPDATE ${onUpdates.join(", ")}`;

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

export const getClassByName = async (className) => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM classes WHERE className = ?";
    return await conn.execute(sql, [className]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getClassByCode = async (classCode) => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM classes WHERE classCode = ?";
    return await conn.execute(sql, [classCode]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

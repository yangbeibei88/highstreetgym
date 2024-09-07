import { pool } from "../config/db.js";

const dbPool = await pool();

export const getAllUsers = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM users";
    const [rows] = await conn.execute(sql);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getUser = async (id) => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM users WHERE userId = ?";
    const [rows] = await conn.execute(sql, [id]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getTrainers = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM users WHERE userRole = ?";
    const [rows] = await conn.execute(sql, ["trainer"]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};
export const getTrainerById = async (id) => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM users WHERE userRole = ? AND userId = ?";
    const [rows] = await conn.execute(sql, ["trainer", +id]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const findUserByEmail = async (email) => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM users WHERE emailAddress = ?";
    // const [data] = await conn.execute(sql, [email]);
    // return data.pop(); // return object
    const [rows] = await conn.execute(sql, [email]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const insertUser = async (user) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "INSERT INTO users (firstName, lastName, emailAddress, phoneNumber, password) VALUES (?, ?, ?, ?, ?)";
    // return await conn.execute(sql, valuesArr);
    const [result] = await conn.execute(sql, [
      user.firstName,
      user.lastName,
      user.emailAddress,
      user.phoneNumber,
      user.password,
    ]);
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    return { ...user, userId: result.insertId };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

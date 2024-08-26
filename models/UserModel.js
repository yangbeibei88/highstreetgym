import { pool } from "../config/db.js";

const dbPool = await pool();

export const getAllUsers = async () => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM users";
    return await conn.execute(sql);
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
    return await conn.execute(sql, [id]);
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
    return await conn.execute(sql, [email]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const insertUser = async (valuesArr) => {
  const conn = await dbPool.getConnection();
  try {
    const sql =
      "INSERT INTO users (firstName, lastName, emailAddress, phoneNumber, password) VALUES (?, ?, ?, ?, ?)";
    return await conn.execute(sql, valuesArr);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

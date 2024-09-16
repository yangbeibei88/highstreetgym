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
export const getTrainerByEmail = async (email) => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "SELECT * FROM users WHERE userRole = ? AND emailAddress = ?";
    const [rows] = await conn.execute(sql, ["trainer", email]);
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

export const updatePassword = async (user) => {
  const conn = await dbPool.getConnection();
  try {
    const sql = "UPDATE users SET password = ? WHERE userId = ?";
    await conn.execute(sql, [user.password, user.userId]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const updateUser = async (user) => {
  const conn = await dbPool.getConnection();
  try {
    const setFields = [
      "firstName = ?",
      "lastName = ?",
      "phoneNumber = ?",
      "address = ?",
      "suburb = ?",
      "postcode = ?",
      "state = ?",
      "bio = ?",
    ];

    const values = [
      user.firstName,
      user.lastName,
      user.phoneNumber,
      user.address,
      user.suburb,
      user.postcode,
      user.state,
      user.bio,
    ];

    if (user.avatar) {
      setFields.push("avatar = ?");
      values.push(user.avatar);
    }
    const sql = `UPDATE users SET ${setFields} WHERE userId = ?`;
    await conn.execute(sql, [...values, user.userId]);
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

export const getFilteredUsers = async (query = {}) => {
  const conn = await dbPool.getConnection();

  let baseSql = `FROM users WHERE 1=1`;

  const queryParams = [];

  if (query.role && query.role.length > 0) {
    const selectedRoles = query.role;
    const placeholders = selectedRoles.map(() => "?").join(",");
    baseSql += ` AND userRole IN (${placeholders})`;
    queryParams.push(...selectedRoles);
  }

  if (query.search) {
    const searchTerm = `%${query.search}%`;
    baseSql += " AND (firstName LIKE ? OR lastName LIKE ?)";
    queryParams.push(searchTerm, searchTerm);
  }

  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  const paginationSql = " LIMIT ? OFFSET ?";
  queryParams.push(limit, offset);

  try {
    const sql = `SELECT * ${baseSql} ${paginationSql}`;
    const [filteredUsers] = await conn.execute(sql, queryParams);

    console.log(queryParams);

    const countSql = `SELECT COUNT(*) AS totalItems ${baseSql}`;
    const [totalCountResult] = await conn.execute(
      countSql,
      queryParams.slice(0, -2),
    );

    const { totalItems } = totalCountResult[0];

    // CALCULATE TOTAL PAGES
    const totalPages = Math.ceil(totalItems / limit);

    return { filteredUsers, page, totalItems, totalPages, limit };
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    conn.release();
  }
};

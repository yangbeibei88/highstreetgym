import mysql from "mysql2/promise";

export const connectDB = async () => {
  try {
    await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    console.log("DB connected!");
  } catch (error) {
    console.log(error);
  }
};

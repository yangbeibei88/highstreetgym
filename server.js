import { app } from "./app.js";
import { pool } from "./config/db.js";

const PORT = process.env.PORT || 8085;

const server = app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing MySQL pool...");
  // closing all connection
  await pool.end();
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

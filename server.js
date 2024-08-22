import { app } from "./app.js";
import { connectDB } from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});

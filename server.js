import { app } from "./app.js";

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});

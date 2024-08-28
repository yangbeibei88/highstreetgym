import express from "express";
import morgan from "morgan";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
// eslint-disable-next-line import/no-extraneous-dependencies
import cookieParser from "cookie-parser";
import { classRouter } from "./routes/classRoutes.js";
import { timetableRouter } from "./routes/timetableRoutes.js";
import { articleRouter } from "./routes/articleRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";

export const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// set `public` folder as static folder
app.use(express.static(path.join(__dirname, "public")));

// development logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("common"));
}

// BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// COOKIE PARSER
app.use(cookieParser());

// ROUTES
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.use("/", authRouter);
app.use("/classes", classRouter);
app.use("/timetable", timetableRouter);
app.use("/blog", articleRouter);
app.use("/auth", userRouter);

// app.get("/booking", (req, res) => {
//   res.render("booking", { title: "Booking" });
// });
// app.get("/booking-confirm", (req, res) => {
//   res.render("booking-confirm", { title: "Booking Confirm" });
// });

// app.get("/create-article", (req, res) => {
//   res.render("create-article", { title: "Create Article" });
// });

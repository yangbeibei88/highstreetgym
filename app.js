// eslint-disable-next-line import/no-extraneous-dependencies
import express from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from "morgan";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { classRouter } from "./routes/classRoutes.js";
import { timetableRouter } from "./routes/timetableRoutes.js";

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

// ROUTES
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});
app.use("/classes", classRouter);
app.use("/timetable", timetableRouter);

// app.get("/login", (req, res) => {
//   res.render("login", { title: "Login" });
// });
// app.get("/signup", (req, res) => {
//   res.render("signup", { title: "Signup" });
// });
// app.get("/classes", (req, res) => {
//   res.render("classes", { title: "All Classes" });
// });
// app.get("/my-profile", (req, res) => {
//   res.render("my-profile", { title: "My Profile" });
// });
// app.get("/blog", (req, res) => {
//   res.render("blog", { title: "Blog" });
// });
// app.get("/article", (req, res) => {
//   res.render("article", { title: "Article" });
// });
// app.get("/timetable", (req, res) => {
//   res.render("timetable", { title: "Timetable" });
// });
// app.get("/booking", (req, res) => {
//   res.render("booking", { title: "Booking" });
// });
// app.get("/booking-confirm", (req, res) => {
//   res.render("booking-confirm", { title: "Booking Confirm" });
// });
// app.get("/dashboard", (req, res) => {
//   res.render("dashboard", { title: "My Dashboard" });
// });
// app.get("/my-bookings", (req, res) => {
//   res.render("my-bookings", { title: "My Bookings" });
// });
// app.get("/my-articles", (req, res) => {
//   res.render("my-articles", { title: "My Articles" });
// });
// app.get("/my-comments", (req, res) => {
//   res.render("my-comments", { title: "My Comments" });
// });
// app.get("/change-password", (req, res) => {
//   res.render("change-password", { title: "Change Password" });
// });
// app.get("/create-article", (req, res) => {
//   res.render("create-article", { title: "Create Article" });
// });

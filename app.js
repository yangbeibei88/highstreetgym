// eslint-disable-next-line import/no-extraneous-dependencies
import express from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import morgan from "morgan";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

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

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});
app.get("/signup", (req, res) => {
  res.render("signup", { title: "Signup" });
});
app.get("/classes", (req, res) => {
  res.render("classes", { title: "All Classes" });
});
app.get("/my-profile", (req, res) => {
  res.render("my-profile", { title: "My Profile" });
});
app.get("/blog", (req, res) => {
  res.render("blog", { title: "Blog" });
});
app.get("/article", (req, res) => {
  res.render("article", { title: "Article" });
});

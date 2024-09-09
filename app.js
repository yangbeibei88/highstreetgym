import express from "express";
import morgan from "morgan";
import cors from "cors";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
// eslint-disable-next-line import/no-extraneous-dependencies
import cookieParser from "cookie-parser";
import { publicRouter } from "./routes/publicRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { AppError } from "./utils/AppError.js";
import { globalErrorHandler } from "./controllers/ErrorController.js";

export const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.options("*", cors());

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
app.use("/", publicRouter);
app.use("/auth", authRouter);

// HANDLE UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} NOT FOUND`, 404));
});

app.use(globalErrorHandler);

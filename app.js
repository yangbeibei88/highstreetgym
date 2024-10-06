import express from "express";
import morgan from "morgan";
import cors from "cors";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import session from "express-session";
import helmet from "helmet";
// eslint-disable-next-line import/no-extraneous-dependencies
import { rateLimit } from "express-rate-limit";
import compression from "compression";
import { publicRouter } from "./routes/publicRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { AppError } from "./utils/AppError.js";
import { globalErrorHandler } from "./controllers/ErrorController.js";

export const app = express();

app.enable("trust proxy");

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cors());
// app.options("*", cors());

// Set security HTTP headers
app.use(helmet());

// Use compression for gzip/deflate compression
app.use(compression());

// COOKIE PARSER
app.use(cookieParser());

// SESSION MIDDLEWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 3000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
    },
  }),
);

// BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set `public` folder as static folder
app.use(express.static(path.join(__dirname, "public")));

// development logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("common"));
}

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  res.locals.successMsg = req.session.successMsg;
  res.locals.errorMsg = req.session.errorMsg;
  res.locals.validationErrorMsg = req.session.validationErrorMsg;
  delete req.session.successMsg;
  delete req.session.errorMsg;
  delete req.session.validationErrorMsg;
  next();
});

// RATE LIMITER
const limiter = rateLimit({
  windowMs: 1 * 10 * 1000, // 10 seconds
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.get("/test", (req, res) => {
  res.send("server connected");
  console.log("Connection successful");
});

// ROUTES
app.use("/", publicRouter);
app.use("/auth", authRouter);

// HANDLE UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  next(
    new AppError(`${req.originalUrl} NOT FOUND`, 404, {
      text: "Back to Home \u2192",
      link: "/",
    }),
  );
});

app.use(globalErrorHandler);

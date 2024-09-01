import { Router } from "express";
import {
  authenticateLoginAction,
  authenticateSignupAction,
} from "../controllers/AuthController.js";
import { adminRouter } from "./adminRoutes.js";
import { accountRouter } from "./accountRoutes.js";

export const authRouter = Router();

authRouter.post("/signup", authenticateSignupAction);
authRouter.post("/login", authenticateLoginAction);

// MOUNT userRouter ONTO authRouter
authRouter.use("/account", accountRouter);
// MOUNT adminRouter ONTO authRouter
authRouter.use("/admin", adminRouter);

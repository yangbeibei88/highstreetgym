import { Router } from "express";
import {
  authenticateLoginAction,
  authenticateSignupAction,
} from "../controllers/AuthController.js";
import { userRouter } from "./userRoutes.js";
import { adminRouter } from "./adminRoutes.js";

export const authRouter = Router();

authRouter.post("/signup", authenticateSignupAction);
authRouter.post("/login", authenticateLoginAction);

// MOUNT userRouter ONTO authRouter
authRouter.use("/user", userRouter);
// MOUNT adminRouter ONTO authRouter
authRouter.use("/admin", adminRouter);

import { Router } from "express";
import {
  authenticateLoginAction,
  authenticateSignupAction,
  logoutAction,
  renderLoginAction,
  renderSignupAction,
} from "../controllers/AuthController.js";
import { adminRouter } from "./adminRoutes.js";
import { accountRouter } from "./accountRoutes.js";

export const authRouter = Router();

authRouter
  .route("/signup")
  .get(renderSignupAction)
  .post(authenticateSignupAction);

authRouter.route("/login").get(renderLoginAction).post(authenticateLoginAction);

authRouter.get("/logout", logoutAction);

// MOUNT userRouter ONTO authRouter
authRouter.use("/account", accountRouter);
// MOUNT adminRouter ONTO authRouter
authRouter.use("/admin", adminRouter);

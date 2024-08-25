import { Router } from "express";
import {
  authenticateLoginAction,
  authenticateSignupAction,
  renderLoginAction,
  renderSignupAction,
} from "../controllers/AuthController.js";

export const authRouter = Router();

authRouter
  .route("/signup")
  .get(renderSignupAction)
  .post(authenticateSignupAction);
authRouter.route("/login").get(renderLoginAction).post(authenticateLoginAction);

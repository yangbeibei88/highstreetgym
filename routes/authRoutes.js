import { Router } from "express";
import {
  renderLoginAction,
  renderSignupAction,
} from "../controllers/AuthController.js";

export const authRouter = Router();

authRouter.get("/signup", renderSignupAction);
authRouter.get("/login", renderLoginAction);

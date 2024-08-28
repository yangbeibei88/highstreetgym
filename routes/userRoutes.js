import { Router } from "express";
import { isLoggedIn } from "../controllers/AuthController.js";
import {
  renderMydashboardAction,
  renderMybookingsAction,
  renderMyarticlesAction,
  renderMycommentsAction,
  renderMyprofileAction,
  renderChangePasswordAction,
} from "../controllers/UserController.js";

export const userRouter = Router();

userRouter.use(isLoggedIn);

userRouter.get("/my-dashboard", renderMydashboardAction);
userRouter.get("/my-bookings", renderMybookingsAction);
userRouter.get("/my-articles", renderMyarticlesAction);
userRouter.get("/my-comments", renderMycommentsAction);
userRouter.get("/my-profile", renderMyprofileAction);
userRouter.get("/change-password", renderChangePasswordAction);

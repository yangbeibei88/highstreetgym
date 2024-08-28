import { Router } from "express";
import { isLoggedIn, logoutAction } from "../controllers/AuthController.js";
import { renderChangePasswordAction } from "../controllers/UserController.js";
import { renderMybookingsAction } from "../controllers/user/UserBookingController.js";
import { renderMydashboardAction } from "../controllers/user/UserDashboardController.js";
import { renderMyarticlesAction } from "../controllers/user/UserArticleController.js";
import { renderMycommentsAction } from "../controllers/user/UserCommentController.js";
import { renderMyprofileAction } from "../controllers/user/UserProfileController.js";

export const userRouter = Router();

userRouter.use(isLoggedIn);

userRouter.get("/my-dashboard", renderMydashboardAction);
userRouter.get("/my-bookings", renderMybookingsAction);
userRouter.get("/my-articles", renderMyarticlesAction);
userRouter.get("/my-comments", renderMycommentsAction);
userRouter.get("/my-profile", renderMyprofileAction);
userRouter.get("/change-password", renderChangePasswordAction);
userRouter.get("/logout", logoutAction);
// userRouter.get("/logout", logoutAction);

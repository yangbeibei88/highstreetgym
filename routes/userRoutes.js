import { Router } from "express";
import { isLoggedIn, logoutAction } from "../controllers/AuthController.js";
import { renderChangePasswordAction } from "../controllers/UserController.js";
import {
  createBookingAction,
  renderMybookingsAction,
  showBookingConfirmAction,
  showBookingFormAction,
} from "../controllers/user/UserBookingController.js";
import { renderMydashboardAction } from "../controllers/user/UserDashboardController.js";
import {
  createArticleAction,
  renderMyarticlesAction,
  showCreateArticleFormAction,
} from "../controllers/user/UserArticleController.js";
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

userRouter
  .route("/article/create")
  .get(showCreateArticleFormAction)
  .post(createArticleAction);

userRouter
  .route("/timetable/:timetableId/booking")
  .get(showBookingFormAction)
  .post(createBookingAction);

userRouter.get("/booking-confirmation/:bookingId", showBookingConfirmAction);

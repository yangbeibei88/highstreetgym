import { Router } from "express";
import { isLoggedIn, logoutAction } from "../controllers/AuthController.js";
import {
  createBookingAction,
  listAccountbookingsAction,
  showBookingConfirmAction,
  showBookingFormAction,
} from "../controllers/account/ManageBookingController.js";
import { showMydashboardAction } from "../controllers/account/AccountDashboardController.js";
import {
  listAccountArticlesAction,
  saveArticleAction,
  showArticleFormAction,
} from "../controllers/account/ManageArticleController.js";
import { listAccountCommentsAction } from "../controllers/account/ManageCommentController.js";
import { showMyprofileAction } from "../controllers/account/AccountProfileController.js";
import { showChangePasswordAction } from "../controllers/account/AccountPasswordController.js";

export const accountRouter = Router();

accountRouter.use(isLoggedIn);

accountRouter.get("/my-dashboard", showMydashboardAction);
accountRouter.get("/manage-bookings", listAccountbookingsAction);
accountRouter.get("/manage-articles", listAccountArticlesAction);
accountRouter.get("/manage-comments", listAccountCommentsAction);
accountRouter.get("/my-profile", showMyprofileAction);
accountRouter.get("/change-password", showChangePasswordAction);
accountRouter.get("/logout", logoutAction);

accountRouter.route("/articleForm/create").get(showArticleFormAction);

accountRouter.route("/articleForm/:articleId/edit").get(showArticleFormAction);

accountRouter.route("/articleForm/save").post(saveArticleAction);

accountRouter
  .route("/timetable/:timetableId/bookingForm")
  .get(showBookingFormAction)
  .post(createBookingAction);

accountRouter.get("/booking-confirmation/:bookingId", showBookingConfirmAction);

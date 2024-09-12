import { Router } from "express";
import {
  protect,
  updatePasswordAction,
} from "../controllers/AuthController.js";
import {
  accountBookingConfirmRestrict,
  createBookingAction,
  listAccountbookingsAction,
  showBookingConfirmAction,
  showBookingFormAction,
  timetableCheck,
} from "../controllers/account/ManageBookingController.js";
import { showMydashboardAction } from "../controllers/account/AccountDashboardController.js";
import {
  accountArticleRestrict,
  createArticleAction,
  listAccountArticlesAction,
  showArticleFormAction,
  updateArticleAction,
  validateArticleForm,
} from "../controllers/account/ManageArticleController.js";
import {
  articleCheck,
  createCommentAction,
  listAccountCommentsAction,
} from "../controllers/account/ManageCommentController.js";
import { showMyprofileAction } from "../controllers/account/AccountProfileController.js";
import { showChangePasswordAction } from "../controllers/account/AccountPasswordController.js";
import { imageUpload } from "../utils/uploadHandler.js";

export const accountRouter = Router();

// accountRouter.use(isLoggedIn);
accountRouter.use(protect);

accountRouter.get("/", showMydashboardAction);
accountRouter.get("/manage-bookings", listAccountbookingsAction);
accountRouter.get("/manage-articles", listAccountArticlesAction);
accountRouter.get("/manage-comments", listAccountCommentsAction);
accountRouter.get("/my-profile", showMyprofileAction);

accountRouter
  .route("/articleForm/create")
  .get(showArticleFormAction)
  .post(
    imageUpload("public/images/blog").single("imageCover"),
    validateArticleForm,
    createArticleAction,
  );

accountRouter
  .route("/articleForm/:articleId/edit")
  .get(accountArticleRestrict, showArticleFormAction)
  .post(
    accountArticleRestrict,
    imageUpload("public/images/blog").single("imageCover"),
    validateArticleForm,
    updateArticleAction,
  );

accountRouter
  .route("/timetable/:timetableId/bookingForm")
  .get(timetableCheck, showBookingFormAction)
  .post(timetableCheck, createBookingAction);

accountRouter.get(
  "/booking-confirmation/:bookingId",
  accountBookingConfirmRestrict,
  showBookingConfirmAction,
);

accountRouter
  .route("/blog/:articleId/comment")
  .post(articleCheck, createCommentAction);

accountRouter
  .route("/change-password")
  .get(showChangePasswordAction)
  .post(updatePasswordAction);

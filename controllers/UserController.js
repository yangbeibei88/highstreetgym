export const renderMydashboardAction = async (req, res, next) =>
  res.status(200).render("my-dashboard", { title: "My Dashboard" });

export const renderMybookingsAction = async (req, res, next) =>
  res.status(200).render("my-bookings", { title: "My Bookings" });

export const renderMyarticlesAction = async (req, res, next) => {
  res.status(200).render("my-articles", { title: "My Articles" });
};
export const renderMycommentsAction = async (req, res, next) => {
  res.status(200).render("my-comments", { title: "My Comments" });
};
export const renderMyprofileAction = async (req, res, next) => {
  res.status(200).render("my-profile", { title: "My Profile" });
};
export const renderChangePasswordAction = async (req, res, next) => {
  res.status(200).render("change-password", { title: "Change Password" });
};

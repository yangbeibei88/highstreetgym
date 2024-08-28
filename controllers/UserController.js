export const renderMydashboardAction = async (req, res, next) =>
  res.status(200).render("my-dashboard");

export const renderMybookingsAction = async (req, res, next) =>
  res.status(200).render("my-bookings");

export const renderMyarticlesAction = async (req, res, next) => {
  res.status(200).render("my-articles");
};
export const renderMycommentsAction = async (req, res, next) => {
  res.status(200).render("my-comments");
};
export const renderMyprofileAction = async (req, res, next) => {
  res.status(200).render("my-profile");
};
export const renderChangePasswordAction = async (req, res, next) => {
  res.status(200).render("change-password");
};

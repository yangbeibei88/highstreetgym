export const showChangePasswordAction = async (req, res, next) => {
  res
    .status(200)
    .render("account/change-password", { title: "Change Password" });
};

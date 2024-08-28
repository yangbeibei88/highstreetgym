export const renderMyprofileAction = async (req, res, next) => {
  res.status(200).render("user/my-profile", { title: "My Profile" });
};

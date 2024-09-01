export const showMyprofileAction = async (req, res, next) => {
  res.status(200).render("account/my-profile", { title: "My Profile" });
};

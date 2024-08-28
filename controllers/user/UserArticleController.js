export const renderMyarticlesAction = async (req, res, next) => {
  res.status(200).render("user/my-articles", { title: "My Articles" });
};

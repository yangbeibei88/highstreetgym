export const renderMycommentsAction = async (req, res, next) => {
  res.status(200).render("user/my-comments", { title: "My Comments" });
};

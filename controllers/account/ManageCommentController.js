export const listAccountCommentsAction = async (req, res, next) => {
  res.status(200).render("account/manage-comments", { title: "My Comments" });
};

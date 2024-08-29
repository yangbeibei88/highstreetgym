export const renderMyarticlesAction = async (req, res, next) => {
  res.status(200).render("user/my-articles", { title: "My Articles" });
};

export const showCreateArticleFormAction = async (req, res, next) => {
  res.render("user/create-article", {
    title: "Create Article",
  });
};

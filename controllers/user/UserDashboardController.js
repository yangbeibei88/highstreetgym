export const renderMydashboardAction = async (req, res, next) =>
  res.status(200).render("user/my-dashboard", { title: "My Dashboard" });

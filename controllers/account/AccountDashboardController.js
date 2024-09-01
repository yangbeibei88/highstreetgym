export const showMydashboardAction = async (req, res, next) =>
  res.status(200).render("account/my-dashboard", { title: "My Dashboard" });

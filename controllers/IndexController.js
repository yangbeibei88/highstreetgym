export const renderHomeAction = (req, res) =>
  res.status(200).render("index", {
    title: "Home",
    query: req.query,
  });

export const renderSignupAction = async (req, res, next) => {
  res.status(200).render("signup", { title: "Sign Up" });
};
export const renderLoginAction = async (req, res, next) => {
  res.status(200).render("login", { title: "Login" });
};
export const authenticateSignupAction = async (req, res, next) => {
  // 1) SCOPE FIELDS
  // 2) FORM FIELDS VALIDATION
  // 3) VALIDATE IF EMAIL ALREADY EXITS IN DB
  // 4) DATA SANITISATION
};

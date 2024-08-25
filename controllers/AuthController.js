export const renderSignupAction = async (req, res, next) => {
  res.status(200).render("signup", { title: "Sign Up" });
};
export const renderLoginAction = async (req, res, next) => {
  res.status(200).render("login", { title: "Login" });
};
export const authenticateSignupAction = async (req, res, next) => {
  console.log(req.body);

  let errors = [];
  // 1) SCOPE FIELDS
  const inputData = {
    register_firstname: req.body.register_firstname,
    register_lastname: req.body.register_lastname,
    register_mobilenumber: req.body.register_mobilenumber,
    register_email: req.body.register_email,
    register_password: req.body.register_password,
    register_confirmPassword: req.body.register_confirmPassword,
  };

  // 2) FORM FIELDS VALIDATION
  // 3) VALIDATE IF EMAIL ALREADY EXITS IN DB
  // 4) DATA SANITISATION
};

export const authenticateLoginAction = async (req, res, next) => {
  console.log(req.body);
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.error("Error 👉: ", err);
  console.log(err.action);
  return res.status(err.statusCode).render("error", {
    title: err.statusCode,
    errorCode: err.statusCode,
    errorMsg: err.message,
    action: err.action,
  });
};

// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from "jsonwebtoken";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const createSendToken = (res, user) => {
  const token = signToken(user.userId);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  // set secure to true only in production mode
  // cookieOption.secure = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, cookieOption);

  // remove password from output
  // user.password = undefined;

  // res.status(statusCode).json({
  //   success: true,
  //   token,
  //   data: { user },
  // });
};

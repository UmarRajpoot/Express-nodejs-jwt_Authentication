import createError from "http-errors";
import jwt from "jsonwebtoken";

const check_token = (req, res, next) => {
  let SECRET_TOKEN =
    "7ec8fbf5-f6f8-4761-9b51-f204d02f415742283640-869c-46f4-996e-915cb08ce067";

  let token = req.headers["x-access-token"];

  if (!token) {
    return next(createError(403, "Token is Not Provided"));
  }

  const verify_JWT = jwt.verify(token, SECRET_TOKEN, (err) => {
    if (err) {
      return next(createError(403, err));
    }
    next();
  });
};

export default check_token;

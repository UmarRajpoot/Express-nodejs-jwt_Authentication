import createError from "http-errors";
import jwt from "jsonwebtoken";
import Joi from "joi";
import Auth from "../Models/Auth";

const generate_refresh = (req, res, next) => {
  let token = req.headers["x-access-token"];

  const decoded_jwt = jwt.decode(token);
  generate_refresh(decoded_jwt);
};

export default generate_refresh;

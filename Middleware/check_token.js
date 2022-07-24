import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import Joi from "joi";
import Auth from "../Models/Auth";

import Token_Generation from "./Token_Generation";

const check_token = (req, res, next) => {
  let SECRET_TOKEN =
    "7ec8fbf5-f6f8-4761-9b51-f204d02f415742283640-869c-46f4-996e-915cb08ce067";

  let SECRET_RF_TOKEN =
    "584cf2c2-7aec-4fe0-9b37-f7dd4f2b669081063f75-812f-4065-8be4-33c412e7c9c0";

  let token = req.headers["x-access-token"];

  if (!token) {
    return next(createHttpError(403, "Token is Not Provided"));
  }

  const email_check_schema = Joi.object({
    email: Joi.string().email().lowercase().required(),
  });

  const generate_refresh = async (decoded_jwt) => {
    try {
      const { email } = decoded_jwt;
      const check_email_valid = await email_check_schema.validateAsync({
        email: email,
      });
      if (check_email_valid) {
        const find_email = await Auth.findOne({
          where: {
            email: check_email_valid.email,
          },
        })
          .then((resp) => resp.dataValues)
          .catch((error) => {
            console.log("Error: ", error);
          });
        if (find_email) {
          if (find_email.refresh_token === "") {
            next(createHttpError(500, { message: "You need to Login." }));
          } else {
            const verify_refresh = jwt.verify(
              find_email.refresh_token,
              SECRET_RF_TOKEN,
              (err, con_value) => {
                if (err) {
                  next(createHttpError(502, { message: "You need to Login." }));
                } else {
                  console.log("Auto Generated Access Token on Server.");
                  const { email } = con_value;
                  const generate_token = Token_Generation.token_generate({
                    email,
                  });
                  const update_token = Auth.update(
                    {
                      _token: generate_token,
                    },
                    {
                      where: {
                        email: email,
                      },
                    }
                  )
                    .then((resp) => {
                      next();
                    })
                    .catch((error) => {
                      return next(createHttpError(403, { message: error }));
                    });
                }
              }
            );
          }
        }
      }
    } catch (error) {
      next(createHttpError(403, error));
    }
  };

  const verify_JWT = jwt.verify(token, SECRET_TOKEN, (err) => {
    if (err) {
      const decoded_jwt = jwt.decode(token);
      generate_refresh(decoded_jwt);
    } else {
      next();
    }
  });
};

export default check_token;

import httperrors from "http-errors";
import Auth from "../Models/Auth";
import bcrypt from "bcrypt";
import Joi from "joi";

import Token_engine from "../Middleware/Token_Generation";

const register_schema = Joi.object({
  owner_name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(3).required(),
});
const login_schema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(3).required(),
});

export default {
  register: async (req, res, next) => {
    try {
      const { body } = req;

      const validatesResult = await register_schema.validateAsync(body, {
        errors: true,
        warnings: true,
      });

      const hash_password = await bcrypt
        .hash(validatesResult.value.password, 10)
        .then((hashed) => {
          return hashed;
        });

      const bind_data = {};

      const create_user = await Auth.create({
        owner_name: validatesResult.value.owner_name,
        email: validatesResult.value.email,
        password: hash_password,
      })
        .then((resp) => {
          res.send("User Crested..");
        })
        .catch((error) => {
          next(
            httperrors(403, {
              message: error || error.errors.map((error) => error.message),
            })
          );
        });
    } catch (error) {
      next(
        httperrors(403, {
          message: error || error.details.map((error) => error.message),
        })
      );
    }
  },
  login: async (req, res, next) => {
    const { body } = req;
    try {
      const validatesResult = await login_schema.validateAsync(body, {
        errors: true,
        warnings: true,
      });
      const find_email = await Auth.findOne({
        where: {
          email: validatesResult.value.email,
        },
      })
        .then((resp) => resp.dataValues)
        .catch((error) => {
          next(
            httperrors(403, {
              message: error || error.errors.map((error) => error.message),
            })
          );
        });

      if (find_email) {
        const compare_hashed = await bcrypt.compare(
          validatesResult.value.password,
          find_email.password
        );
        if (compare_hashed) {
          const update_Auth_token = await Auth.update(
            {
              _token: Token_engine.token_generate({ email: find_email.email }),
              refresh_token: Token_engine.refresh_token({
                email: find_email.email,
              }),
            },
            {
              where: {
                id: find_email.id,
              },
            }
          )
            .then((resp) => {
              res.send("Token Generated.");
            })
            .catch((error) => {
              next(
                httperrors(403, {
                  message: error || error.errors.map((error) => error.message),
                })
              );
            });
        }
      }
    } catch (error) {
      next(
        httperrors(403, {
          message: error || error.details.map((error) => error.message),
        })
      );
    }
  },
  fetch_data: async (req, res, next) => {
    try {
      const fetch_all_users = await Auth.findAll({});
      return res.send({
        success: true,
        data: fetch_all_users,
      });
    } catch (error) {
      next(
        httperrors(403, {
          message: error || error.details.map((error) => error.message),
        })
      );
    }
  },
};

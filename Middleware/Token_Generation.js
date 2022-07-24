import JWT from "jsonwebtoken";

let SECRET_TOKEN =
  "";
let SECRET_RF_TOKEN =
  "";

export default {
  token_generate: (binded_data) => {
    return JWT.sign(binded_data, SECRET_TOKEN, {
      expiresIn: "20s",
    });
  },
  refresh_token: (binded_data) => {
    return JWT.sign(binded_data, SECRET_RF_TOKEN, {
      expiresIn: "120s",
    });
  },
};

import JWT from "jsonwebtoken";

let SECRET_TOKEN =
  "7ec8fbf5-f6f8-4761-9b51-f204d02f415742283640-869c-46f4-996e-915cb08ce067";
let SECRET_RF_TOKEN =
  "584cf2c2-7aec-4fe0-9b37-f7dd4f2b669081063f75-812f-4065-8be4-33c412e7c9c0";

export default {
  token_generate: (binded_data) => {
    return JWT.sign(binded_data, SECRET_TOKEN, {
      expiresIn: "20s",
    });
  },
  refresh_token: (binded_data) => {
    return JWT.sign(binded_data, SECRET_RF_TOKEN, {
      expiresIn: "40s",
    });
  },
};

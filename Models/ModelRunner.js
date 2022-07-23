import sequelize from "./ModelConfig";
import Auth from "./Auth";

sequelize
  .authenticate()
  .then(() => {
    console.log("Authenticate Succeed.");
  })
  .catch((err) => {
    console.log(err);
  });

sequelize.sync().then(() => {
  console.log("Sync Also Done");
});

export default sequelize;

import { Sequelize } from "sequelize";

const sequelize = new Sequelize("auth", "root", "", {
  host: 3306,
  dialect: "mysql",
  logging: false,
  pool: {
    max: 9,
    min: 0,
    idle: 10000,
  },
});

export default sequelize;

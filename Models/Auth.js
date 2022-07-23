import { Sequelize } from "sequelize";
import sequelize from "./ModelConfig";

const Admin_Auth = sequelize.define("admin_auth", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  owner_name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  _token: {
    type: Sequelize.TEXT,
    defaultValue: "",
  },
  refresh_token: {
    type: Sequelize.TEXT,
    defaultValue: "",
  },
});

export default Admin_Auth;

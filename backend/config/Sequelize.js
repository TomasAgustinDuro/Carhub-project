import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
const testingConnection = async () => {
  try {
    await sequelize.authenticate();

    console.log("Connection has been succesfully");
  } catch (error) {
    console.log("Connecction has an error:", error);
  }
};

export default sequelize;

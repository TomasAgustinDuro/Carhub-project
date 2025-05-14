import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
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

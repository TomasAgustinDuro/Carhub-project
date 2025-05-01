import { DataTypes } from "sequelize";
import sequelize from "../config/Sequelize.js";

const Turn = new sequelize.define("turn", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  day: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hour: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  msg: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
});

Turn.getAll = async () => {
  const turns = await Turn.findAll(["day", "DESC"]);

  return turns;
};

Turn.createTurn = async (body) => {
  try {
    await Turn.create({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      day: body.day,
      hour: body.hour,
      msg: body.msg,
    });
  } catch (error) {
    throw error;
  }
};

Turn.removeTurn = async (id) => {
  try {
    await Turn.destroy({
      where: { id },
    });
  } catch (error) {}
};

export default Turn;

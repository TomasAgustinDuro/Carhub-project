import { DataTypes, Model } from "sequelize";
import sequelize from "../config/Sequelize.js";

const Turn = sequelize.define("turn", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  version: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mileage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
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
});

Turn.getAll = async () => {
  const turns = await Turn.findAll({
    order: [["day", "DESC"]],
  });

  return turns;
};

Turn.createTurn = async (body) => {
  console.log(body);

  try {
    return await Turn.create({
      brand: body.brand,
      model: body.model,
      year: body.year,
      version: body.version,
      mileage: body.mileage,
      price: body.price,
      description: body.description,
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      day: body.day,
      hour: body.hour,
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
    return;
  } catch (error) {}
};

export default Turn;

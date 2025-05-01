import { DataTypes } from "sequelize";
import sequelize from "../config/Sequelize.js";

const Review = new sequelize.define("review", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  qualy: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Review.getAll = async () => {
  const reviews = await Review.findAll();

  return reviews;
};

Review.createReview = async (body) => {
  try {
    await Review.create({
      qualy: body.qualy,
      name: body.name,
      content: body.content,
    });
  } catch (error) {
    throw error;
  }
};

Review.removeReview = async (id) => {
  try {
    await Review.destroy({
      where: { id },
    });
  } catch (error) {}
};

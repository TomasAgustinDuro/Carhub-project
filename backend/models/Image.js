import { DataTypes } from "sequelize";
import sequelize from "../config/Sequelize.js";

const Image = sequelize.define("image", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  carId: {
    type: DataTypes.UUID,
    references: {
      model: "cars",
      key: "id",
    },
  },
});

Image.getAll = async () => {
  const allImages = await Image.findAll();

  return allImages;
};

Image.insertImage = async (body, options = {}) => {
  try {
    const image = await Image.create(
      {
        title: body.title,
        description: body.description,
        url: body.url,
        carId: body.carId,
      },
      options
    ); // <- Aca SI usamos la transacción

    console.log("imagen creada en inserImge", image);
    return image;
  } catch (error) {
    console.error("Error insertando imagen:", error);
    throw error;
  }
};

Image.editImage = async (id, body) => {
  try {
    const newImage = await Image.update(
      {
        title: body.title,
        description: body.description,
        url: body.url,
      },
      { where: { id } }
    );

    return newImage;
  } catch (error) {
    throw error;
  }
};

Image.removeImage = async (id) => {
  await Image.destroy({ where: { id } });

  return;
};

export default Image;

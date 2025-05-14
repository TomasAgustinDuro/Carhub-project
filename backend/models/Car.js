import { DataTypes } from "sequelize";
import sequelize from "../config/Sequelize.js";
import Image from "./Image.js";
import Review from "./Review.js";

const Car = sequelize.define("car", {
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
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  transmission: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  fuel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tank: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  horsePower: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mileage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doors: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  traction: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wheelMaterial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wheelSize: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abs: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  tractionControl: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  radio: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  bluetooth: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  usb: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  tableName: "cars",
});

Car.getAll = async () => {
  const allCars = await Car.findAll({
    include: [
      {
        model: Image,
        as: "images",
      },
    ],
  });

  return allCars;
};

Car.getFilteredCars = async (filter) => {
  try {
    console.log("filter", filter);
    const carsFiltered = await Car.findAll({
      where: { ...filter },
      include: [{ model: Image, as: "images" }],
    });

    console.log("carsFiltered", carsFiltered);
    return carsFiltered;
  } catch (error) {
    throw error;
  }
};

Car.getCarById = async (id) => {
  try {
    const car = await Car.findByPk(id, {
      include: [
        {
          model: Image,
          as: "images",
        },
      ],
    });

    return car;
  } catch (error) {
    throw error;
  }
};

Car.addCar = async (body) => {
  try {
    const car = await Car.create({
      brand: body.brand,
      model: body.model,
      version: body.version,
      color: body.color,
      year: body.year,
      transmission: body.transmission,
      price: body.price,
      fuel: body.fuel,
      tank: body.tank,
      horsePower: body.horsePower,
      mileage: body.mileage,
      doors: body.doors,
      traction: body.traction,
      wheelMaterial: body.wheelMaterial,
      wheelSize: body.wheelSize,
      abs: body.abs,
      tractionControl: body.tractionControl,
      radio: body.radio,
      bluetooth: body.bluetooth,
      usb: body.usb,
    });

    return car;
  } catch (error) {
    throw error;
  }
};

Car.editCar = async (id, body) => {
  try {
    const car = await Car.update(
      {
        brand: body.brand,
        model: body.model,
        version: body.version,
        color: body.color,
        year: body.year,
        transmission: body.transmission,
        price: body.price,
        fuel: body.fuel,
        tank: body.tank,
        horsePower: body.horsePower,
        mileage: body.mileage,
        doors: body.doors,
        traction: body.traction,
        wheelMaterial: body.wheelMaterial,
        wheelSize: body.wheelSize,
        abs: body.abs,
        tractionControl: body.tractionControl,
        radio: body.radio,
        bluetooth: body.bluetooth,
        usb: body.usb,
      },
      { where: { id } }
    );

    if (car === 0) {
      throw new Error("No se encontró el auto o no se realizaron cambios.");
    }

    return car;
  } catch (error) {
    throw error;
  }
};

Car.removeCar = async (id) => {
  try {
    await Car.destroy({ where: { id } });
    return;
  } catch (error) {
    throw error;
  }
};

export default Car;

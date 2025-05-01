import { DataTypes } from "sequelize";
import sequelize from "../config/Sequelize.js";

// TODO: includes in findAll to obtain Images and Reviews

const Car = sequelize.define("car", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.NUMBER,
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
    type: DataTypes.NUMBER,
    allowNullfalse,
  },
  doors: {
    type: DataTypes.NUMBER,
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
  tranctionControl: {
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
});

Car.getAll = async () => {
  const allCars = await Car.findAll();

  return allCars;
};

Car.getFilteredCars = async (filter) => {
  try {
    const carsFiltered = await Car.findAll({ where: { filter } });

    return carsFiltered;
  } catch (error) {
    throw error;
  }
};

Car.getCarById = async (id) => {
  try {
    const car = await Car.findByPK(id);

    return car;
  } catch (error) {
    throw error;
  }
};

Car.addCar = async (id, body) => {
  try {
    await Car.create(
      {
        brand: body.brand,
        year: body.year,
        transmission: body.transmission,
        price: body.price,
        fuel: body.fuel,
        tank: body.tank,
        horsePower: body.horsePower,
        mileage: body.mileage,
        doors: body.doors,
        tranction: body.traction,
        wheelMaterial: body.wheelMaterial,
        wheelSize: body.wheelSize,
        abs: body.abs,
        tranctionControl: body.tranctionControl,
        radio: body.radio,
        bluetooth: body.bluetooth,
        usb: body.usb,
      },
      { where: { id } }
    );
  } catch (error) {
    throw error;
  }
};

Car.editCar = async (body) => {
  try {
    await Car.update({
      brand: body.brand,
      year: body.year,
      transmission: body.transmission,
      price: body.price,
      fuel: body.fuel,
      tank: body.tank,
      horsePower: body.horsePower,
      mileage: body.mileage,
      doors: body.doors,
      tranction: body.traction,
      wheelMaterial: body.wheelMaterial,
      wheelSize: body.wheelSize,
      abs: body.abs,
      tranctionControl: body.tranctionControl,
      radio: body.radio,
      bluetooth: body.bluetooth,
      usb: body.usb,
    });
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

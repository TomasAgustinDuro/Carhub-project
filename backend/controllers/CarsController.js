import Car from "../models/Car.js";
import Image from "../models/Image.js";
import sequelize from "../config/Sequelize.js";
import { validator } from "sequelize/lib/utils/validator-extras";
import { carSchema } from "../validation/Car.schema.js";

// TODO: create transactions to add image in addCar and editCar

export class CarController {
  static async getAll(req, res) {
    try {
      const cars = await Car.getAll();

      res.status(200).json(cars); // ✅ MUY importante
    } catch (error) {
      res.status(400).json({ message: "Invalid car" });
    }
  }

  static async getFilteredCars(req, res) {
    const filters = req.body;
    console.log("📍 Llegó POST a /cars/filtered");
    console.log("📦 Body completo:", req.body);
    console.log("🎯 Filters recibidos:", JSON.stringify(filters, null, 2));

    try {
      const cars = await Car.getFilteredCars(filters);
      console.log(cars);

      res.status(200).json({ cars });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving filtered cars" });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: "Invalid UUID" });
    }

    try {
      const carById = await Car.getCarById(id);
      return res.status(200).json({ carById });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async addCar(req, res) {
    const carT = await sequelize.transaction();

    const body = req.body;

    const validation = carSchema.safeParse(body);

    if (!validation.success) {
      console.log(validation.error.format());
      return res.status(500).json({ error: error.message });
    }

    try {
      const newCar = {
        brand: body.brand,
        model: body.model,
        version: body.version,
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
      };

      const car = await Car.addCar(newCar, { transaction: carT });
      await Promise.all(
        body.images.map((img) => {
          const newImage = {
            title: "",
            description: "",
            url: img.url,
            carId: car.id,
          };

          return Image.insertImage(newImage, { transaction: carT });
        })
      );

      carT.commit();
      res.status(200).json("Guardado");
    } catch (error) {
      carT.rollback();
      console.error("BACKEND ERROR", error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async editCar(req, res) {
    const editCarT = await sequelize.transaction();

    const body = req.body;
    const id = body.id;

    const newCar = {
      brand: body.brand,
      model: body.model,
      version: body.version,
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
    };

    try {
      const car = await Car.editCar(id, newCar, { transaction: editCarT });

      const deleted = await Image.destroy({
        where: { carId: id },
        transaction: editCarT,
      });

      await Promise.all(
        body.images.map((img) => {
          const newImage = {
            title: "",
            description: "",
            url: img.url,
            carId: id,
          };

          return Image.insertImage(newImage, { transaction: editCarT });
        })
      );

      editCarT.commit();
      res.status(200).json("Guardado");
    } catch (error) {
      editCarT.rollback();
      return res.status(500).json({ error: error.message });
    }
  }

  static async removeCar(req, res) {
    const { id } = req.params;
    try {
      await Image.destroy({ where: { carId: id } });
      await Car.removeCar(id);

      return;
    } catch (error) {
      console.log(error);
    }
  }
}
export default CarController;

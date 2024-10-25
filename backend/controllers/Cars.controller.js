import { CarModel } from "../models/Car.model.js";

export class CarController {
  static async getAll(req, res) {
    try {
      const {
        model,
        year,
        transmission,
        price,
        type_fuel,
        tank_capacity,
        horsepower,
        mileage,
        doors,
        drive_type,
        wheel_material,
        wheel_size,
        abs,
        traction_control,
        upholstery,
        radio,
        bluetooth,
        usb,
      } = req.query;

      const autos = await CarModel.getAll({
        model,
        year,
        transmission,
        price,
        type_fuel,
        tank_capacity,
        horsepower,
        mileage,
        doors,
        drive_type,
        wheel_material,
        wheel_size,
        abs,
        traction_control,
        upholstery,
        radio,
        bluetooth,
        usb,
      });

      res.json(autos);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error obteniendo autos", details: error.message }); // Proporciona detalles del error
    }
  }

  static async getById(req, res) {
    try {
      const carId = req.params.id;

      const autos = await CarModel.getById({ id: carId });

      res.json(autos);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error obteniendo autos", details: error.message }); // Proporciona detalles del error
    }
  }

  
}

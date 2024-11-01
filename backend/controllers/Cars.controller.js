import { CarModel } from "../models/Car.model.js";

export class CarController {
  static async getAll(req, res) {
    try {
      const {
        model,
        version,
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
        version,
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

  static async addNewCar(req, res) {
    try {
      const carData = req.body;
      const imagePath = req.files ? req.files.map(file => file.path) : []

      console.log(req.files)
      console.log("Car Data:", carData); 
      console.log("Image URLs:", imagePath);

      const result = await CarModel.addNewcar({
        body: { ...carData, images: imagePath },
      });

      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error interno del servidor", details: error.message });
    }
  }

  static async deleteCar(req, res){
    try{
      const carId =req.params.id;

      await CarModel.deleteCar({ id: carId });
      res.status(200).json({ message: 'Auto eliminado exitosamente' });
      
    } catch(error){
      
      res.status(500).json({ error: 'Error eliminando el auto', details: error.message });
    }
  }

  static async editCar(req, res){
    try{
      const data = req.body
    const id = req.params.id

    const result = await CarModel.editCar({
      id: id,
      body: data
    })

    return res.status(200).json(result);
    }catch(error){
      res.status(500).json({error: 'Error editando el auto', details: error.message})
  }
  }

}

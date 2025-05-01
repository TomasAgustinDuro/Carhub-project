import Car from "../models/Car";

// TODO: create transactions to add image in addCar and editCar

export class CarController {
  static async getAll(req, res) {
    try {
      const cars = Car.getAll();

      return cars;
    } catch (error) {
      console.log(error);
    }
  }

  static async getById(req, res) {
    const id = req.params;

    try {
      const carById = Car.getCarById(id);

      return carById;
    } catch (error) {
      console.log(error);
    }
  }

  static async addCar(req, res) {
    const body = req.body;

    const newCar = {
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
    };

    try {
      const car = Car.addCar(newCar);

      return car;
    } catch (error) {
      console.log(error);
    }
  }

  static async editCar(req, res) {
    const body = req.body;

    const newCar = {
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
    };

    try {
      const car = Car.editCar(newCar);

      return car;
    } catch (error) {
      console.log(error);
    }
  }

  static async removeCar(req, res) {
    const id = req.params;
    try {
      await Car.removeCar(id);

      return console.log("borrado");
    } catch (error) {
      console.log(error);
    }
  }
}

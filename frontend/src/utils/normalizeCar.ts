import { Car } from "../interfaces/CarInterface";

export const normalizeCar = (car: Car): Car => {
  return {
    ...car,
    brand: car.brand?.toLowerCase().trim(),
    model: car.model?.toLowerCase().trim(),
    version: car.version?.toLowerCase().trim(),
    color: car.color?.toLowerCase().trim(),
    fuel: car.fuel?.toLowerCase().trim(),
    tank: car.tank?.toLowerCase().trim(),
    horsePower: car.horsePower?.toLowerCase().trim(),
    traction: car.traction?.toLowerCase().trim(),
    wheelMaterial: car.wheelMaterial?.toLowerCase().trim(),
    wheelSize: car.wheelSize?.toLowerCase().trim(),
  };
};

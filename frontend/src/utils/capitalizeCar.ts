const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

import { Car } from "../interfaces/CarInterface";

export const capitalizeCar = (car: Car): Car => {
  return {
    ...car,
    brand: capitalizeFirstLetter(car.brand),
    model: capitalizeFirstLetter(car.model),
    version: capitalizeFirstLetter(car.version),
    fuel: capitalizeFirstLetter(car.fuel),
    transmission: capitalizeFirstLetter(car.transmission),
    traction: capitalizeFirstLetter(car.traction),
    wheelMaterial: capitalizeFirstLetter(car.wheelMaterial),
  };
};

import Car from "../interfaces/Car";

export const createCarAndAdapter = (car: Car) => ({
  id:car.id,
  model: car.model,
  price: car.price,
  year: car.year,
  mileage: car.mileage,
  transmission: car.transmission,
  image: car.images[0], 
});

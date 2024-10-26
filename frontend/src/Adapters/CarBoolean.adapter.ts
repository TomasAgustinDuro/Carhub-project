import Car from "../interfaces/Car";

export const createCarBooleanAdapter = (car: Car) => ({
  abs: car.abs ? "Sí" : "No",
  bluetooth: car.bluetooth ? "Sí" : "No",
  usb: car.usb ? "Sí" : "No",
  traction: car.traction_control ? "Sí" : "No",
  radio: car.radio ? "Sí" : "No",
  // Agrega más propiedades aquí según sea necesario
  type_fuel: car.type_fuel,
  doors: car.doors,
  wheel_material: car.wheel_material,
  upholstery: car.upholstery,
});

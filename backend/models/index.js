// models/index.js
import Car from "./Car.js";
import Image from "./Image.js";

Car.hasMany(Image, {
  foreignKey: "carId",
  as: "images",
  onDelete: "CASCADE",
  hooks: true,
});
Image.belongsTo(Car, { foreignKey: "carId" });

export { Car, Image };

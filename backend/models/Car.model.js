import db from "../db.js";

export class CarModel {
  static async getAll({
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
  }) {
    let query = `
    SELECT cars.*, GROUP_CONCAT(car_images.img_url) AS images
    FROM cars
    LEFT JOIN car_images ON cars.id = car_images.car_id
  `;

    const filters = [];
    const values = [];

    // Añadir filtros condicionalmente
    if (model) {
      filters.push("model = ?");
      values.push(model);
    }
    if (year) {
      filters.push("year = ?");
      values.push(year);
    }
    if (transmission) {
      filters.push("transmission = ?");
      values.push(transmission);
    }
    if (price) {
      filters.push("price = ?");
      values.push(price);
    }
    if (type_fuel) {
      filters.push("type_fuel = ?");
      values.push(type_fuel);
    }
    if (tank_capacity) {
      filters.push("tank_capacity = ?");
      values.push(tank_capacity);
    }
    if (horsepower) {
      filters.push("horsepower = ?");
      values.push(horsepower);
    }
    if (mileage) {
      filters.push("mileage = ?");
      values.push(mileage);
    }
    if (doors) {
      filters.push("doors = ?");
      values.push(doors);
    }
    if (drive_type) {
      filters.push("drive_type = ?");
      values.push(drive_type);
    }
    if (wheel_material) {
      filters.push("wheel_material = ?");
      values.push(wheel_material);
    }
    if (wheel_size) {
      filters.push("wheel_size = ?");
      values.push(wheel_size);
    }
    if (abs) {
      filters.push("abs = ?");
      values.push(abs === "true" ? 1 : 0); // Convierte a booleano
    }
    if (traction_control) {
      filters.push("traction_control = ?");
      values.push(traction_control === "true" ? 1 : 0); // Convierte a booleano
    }
    if (upholstery) {
      filters.push("upholstery = ?");
      values.push(upholstery);
    }
    if (radio) {
      filters.push("radio = ?");
      values.push(radio === "true" ? 1 : 0); // Convierte a booleano
    }
    if (bluetooth) {
      filters.push("bluetooth = ?");
      values.push(bluetooth === "true" ? 1 : 0); // Convierte a booleano
    }
    if (usb) {
      filters.push("usb = ?");
      values.push(usb === "true" ? 1 : 0); // Convierte a booleano
    }

    // Si hay filtros, añadir la cláusula WHERE
    if (filters.length > 0) {
      query += " WHERE " + filters.join(" AND ");
    }

    query += " GROUP BY cars.id;";

    return new Promise((resolve, reject) => {
      db.query(query, values, (err, results) => {
        if (err) return reject(err);

        const autos = results.map((car) => ({
          ...car,
          id: Buffer.isBuffer(car.id) ? car.id.toString("hex") : null,
          images: car.images ? car.images.split(",") : [],
        }));

        resolve(autos);
      });
    });
  }

  static async getById({ id }) {
    const query = `SELECT cars.*, GROUP_CONCAT(car_images.img_url) AS images
FROM cars
LEFT JOIN car_images ON cars.id = car_images.car_id
WHERE cars.id = uuid_to_bin(?)
GROUP BY cars.id;
 `;
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, results) => {
        if (err) return reject(err);

        const autos = results.map((car) => ({
          ...car,
          id: Buffer.isBuffer(car.id) ? car.id.toString("hex") : null,
          images: car.images ? car.images.split(",") : [],
        }));

        resolve(autos);
      });
    });
  }
}

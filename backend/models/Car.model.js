import db from "../db.js";
import fs from "fs";
import { fileURLToPath } from 'url';
import path from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
   SELECT 
    cars.id, 
    cars.model, 
    cars.version, 
    cars.year, 
    cars.transmission, 
    cars.price, 
    cars.type_fuel, 
    cars.tank_capacity, 
    cars.horsepower, 
    cars.mileage, 
    cars.doors, 
    cars.drive_type, 
    cars.wheel_material, 
    cars.wheel_size, 
    cars.abs, 
    cars.traction_control, 
    cars.upholstery, 
    cars.radio, 
    cars.bluetooth, 
    cars.usb, 
    GROUP_CONCAT(car_images.img_url) AS images
FROM 
    cars
LEFT JOIN 
    car_images ON cars.id = car_images.car_id
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

    query += ` GROUP BY 
    cars.id, 
    cars.model, 
    cars.version, 
    cars.year, 
    cars.transmission, 
    cars.price, 
    cars.type_fuel, 
    cars.tank_capacity, 
    cars.horsepower, 
    cars.mileage, 
    cars.doors, 
    cars.drive_type, 
    cars.wheel_material, 
    cars.wheel_size, 
    cars.abs, 
    cars.traction_control, 
    cars.upholstery, 
    cars.radio, 
    cars.bluetooth, 
    cars.usb;`;

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
    let query = `SELECT cars.*, GROUP_CONCAT(car_images.img_url) AS images
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

  static async addNewcar({ body }) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO cars (
          model, version, year, transmission, price, type_fuel, tank_capacity, horsepower,
          mileage, doors, drive_type, wheel_material, wheel_size, abs,
          traction_control, upholstery, radio, bluetooth, usb
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        query,
        [
          body.model,
          body.version,
          body.year,
          body.transmission,
          body.price,
          body.type_fuel,
          body.tank_capacity,
          body.horsepower,
          body.mileage,
          body.doors,
          body.drive_type,
          body.wheel_material,
          body.wheel_size,
          body.abs ? 1 : 0, // Conversión de booleano a entero
          body.traction_control ? 1 : 0, // Conversión de booleano a entero
          body.upholstery,
          body.radio ? 1 : 0, // Conversión de booleano a entero
          body.bluetooth ? 1 : 0, // Conversión de booleano a entero
          body.usb ? 1 : 0, // Conversión de booleano a entero
        ],
        (err, results) => {
          if (err) return reject(err);

          const uuidQuery = "SELECT id FROM cars ORDER BY id DESC LIMIT 1;";

          db.query(uuidQuery, (err, results) => {
            if (err) return reject(err);

            const carId = results[0].id;

            console.log("ID del auto insertado:", carId);

            if (!carId) {
              return reject(new Error("id del auto no valido o erroneo"));
            }

            const imagesQuery = `
          INSERT INTO car_images (car_id, img_url) VALUES (?, ?)
        `;

            const promises = body.images.map((img_url) => {
              return new Promise((resolve, reject) => {
                db.query(imagesQuery, [carId, img_url], (err, results) => {
                  if (err) {
                    console.error("Error insertando imagen:", err); // Log para depuración
                    return reject(err);
                  }
                  resolve(results);
                });
              });
            });

            Promise.all(promises)
              .then(() =>
                resolve("Auto y sus imágenes se han insertado correctamente")
              )
              .catch((err) => reject(err));
          });
        }
      );
    });
  }

  static async deleteCar({ id }) {
    const selectImgQuery =
      "SELECT img_url FROM car_images WHERE car_id = UUID_TO_BIN(?)";
    const deleteCarQuery = "DELETE FROM cars WHERE id = UUID_TO_BIN(?)";

    return new Promise((resolve, reject) => {
      // Primero seleccionamos las imágenes
      db.query(selectImgQuery, [id], (err, results) => {
        if (err) {
          return reject(err);
        }

        // Verificar si `results` contiene las imágenes
        if (Array.isArray(results) && results.length > 0) {
          // Eliminar físicamente los archivos
          results.forEach((row) => {
            const filePath = path.join(__dirname, "../", row.img_url);
            console.log(`Eliminando archivo: ${filePath}`);
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(`No se pudo eliminar ${filePath}:`, err);
              } else {
                console.log(`${filePath} ha sido eliminado.`);
              }
            });
          });
        }

        // Eliminar las entradas de imágenes de la base de datos
        const deleteImagesDbQuery =
          "DELETE FROM car_images WHERE car_id = UUID_TO_BIN(?)";
        db.query(deleteImagesDbQuery, [id], (err, result) => {
          if (err) {
            return reject(err);
          }

          // Eliminar el auto de la base de datos
          db.query(deleteCarQuery, [id], (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results);
          });
        });
      });
    });
  }

  static async editCar({ id, body }) {
    return new Promise((resolve, reject) => {
      const selectQuery = "SELECT * FROM cars WHERE id= UUID_TO_BIN(?)";

      db.query(selectQuery, [id], (err, results) => {
        if (err) return reject(err);

        const existingCar = results[0];

        const updatedCar = {
          ...existingCar,
          ...body,
        };

        const updateQuery = `
        UPDATE cars SET
        model = ?, version = ?, year = ?, transmission = ?, price = ?, type_fuel = ?, tank_capacity = ?, horsepower = ?, mileage = ?, doors = ?, drive_type = ?, wheel_material = ?, wheel_size = ?, abs = ?, traction_control = ?, upholstery = ?, radio = ?, bluetooth = ?, usb = ?
        WHERE id = UUID_TO_BIN(?)
      `;

        db.query(
          updateQuery,
          [
            updatedCar.model,
            updatedCar.version,
            updatedCar.year,
            updatedCar.transmission,
            updatedCar.price,
            updatedCar.type_fuel,
            updatedCar.tank_capacity,
            updatedCar.horsepower,
            updatedCar.mileage,
            updatedCar.doors,
            updatedCar.drive_type,
            updatedCar.wheel_material,
            updatedCar.wheel_size,
            updatedCar.abs ? 1 : 0,
            updatedCar.traction_control ? 1 : 0,
            updatedCar.upholstery,
            updatedCar.radio ? 1 : 0,
            updatedCar.bluetooth ? 1 : 0,
            updatedCar.usb ? 1 : 0,
            id,
          ],
          (err, results) => {
            if (err) return reject(err);
            resolve(results);
          }
        );
      });
    });
  }
}

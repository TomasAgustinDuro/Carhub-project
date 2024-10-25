import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import z from "zod";
import { transporter } from "./mailer.js";

const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config();

app.use(cors());
app.use(express.json());

// Conexion a db
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect((err) => {
  if (err) {
    return;
  }
});

// Obtener todos los autos
app.get("/api/cars", (req, res) => {
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

  // Ejecutar la consulta
  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error obteniendo autos" });
    }

    const autos = results.map((car) => ({
      ...car,
      id: Buffer.isBuffer(car.id) ? car.id.toString("hex") : null,
      images: car.images ? car.images.split(",") : [],
    }));

    res.json(autos);
  });
});

// Obtener auto por id
app.get("/api/cars/:id", (req, res) => {
  const carId = req.params.id; 

  const query = `SELECT cars.*, GROUP_CONCAT(car_images.img_url) AS images
FROM cars
LEFT JOIN car_images ON cars.id = car_images.car_id
WHERE cars.id = uuid_to_bin(?)
GROUP BY cars.id;
 `;

  db.query(query, [carId], (error, results) => {
    if (error) {
      return;
    }

    const autos = results.map((car) => ({
      ...car,
      id: Buffer.isBuffer(car.id) ? car.id.toString("hex") : null,
      images: car.images ? car.images.split(",") : [],
    }));

    res.json(autos);
  });
});

// Obtener reviews
app.get("/api/reviews", (req, res) => {
  db.query("SELECT * FROM reviews", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error obteniendo opiniones" });
    }

    // Formatear las fechas en los resultados
    const formattedResults = results.map((review) => {
      const date = new Date(review.date); // Crea un objeto Date a partir de la cadena
      const options = { year: "numeric", month: "long", day: "numeric" }; // Opciones de formato
      const formattedDate = date.toLocaleDateString("es-ES", options); // Formatea la fecha

      return {
        ...review,
        date: formattedDate, // Reemplaza la fecha original por la formateada
      };
    });

    res.json(formattedResults); // Envía los resultados formateados al cliente
  });
});

// Enviar review
app.post("/api/reviews", (req, res) => {
  const reviewData = req.body;

  if (!reviewData || !reviewData.user_name || !reviewData.review) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  db.query(
    "INSERT INTO reviews (user_name, review) VALUES (?, ?)", // No incluyas id aquí, ya que es auto-incremental
    [reviewData.user_name, reviewData.review],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Error al insertar la opinión" });
      }
      res
        .status(201)
        .json({ message: "Opinión guardada con éxito", id: results.insertId });
    }
  );
});

app.post("/api/sellcar/turns", (req, res) => {
  const turnData = req.body;

  const formSchema = z.object({
    nombre: z
      .string()
      .min(1, "Name is required")
      .regex(/^[A-Za-zÁ-ÿ\s]+$/, "Name can only contain letters and spaces"),

    apellido: z
      .string()
      .min(1, "Lastname is required")
      .regex(
        /^[A-Za-zÁ-ÿ\s]+$/,
        "Lastname can only contain letters and spaces"
      ),

    email: z.string().email("Invalid email format"),

    telefono: z
      .string({
        required_error: "Phone is required",
        invalid_type_error: "Phone must be a valid number",
      })
      .min(10, "Phone number must have at least 10 digits")
      .max(12, "Phone number must have at most 12 digits")
      .regex(/^\d+$/, "Phone number must contain only digits"),

    dia: z
      .string({
        required_error: "Date is required",
        invalid_type_error: "Date must be a valid date",
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .transform((val) => new Date(val))
      .refine((val) => val >= new Date(), {
        message: "Date must be today or later",
      }),

    horario: z
      .string({
        required_error: "Time is required",
        invalid_type_error: "Time must be a valid time format",
      })
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:MM format")
      .refine((val) => val >= "09:00" && val <= "18:00", {
        message: "Time must be between 09:00 and 18:00",
      }),

    mensaje_adicional: z.string().optional(),
  });

  try {
    const validateData = formSchema.parse(turnData);
    const validateDay = validateData.dia.toISOString().substring(0, 10);

    db.query(
      "SELECT * FROM turnos WHERE DATE(dia) = ? AND horario = ?",
      [validateDay, validateData.horario],
      (error, results) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Error al verificar el turno" });
        }

        if (results.length > 0) {
          return res.status(400).json({
            errors: [
              {
                field: "horario",
                message: "Turno ya reservado",
              },
            ],
          });
        }

        db.query(
          "INSERT INTO turnos (nombre, apellido, email, telefono, dia, horario, mensaje_adicional) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            validateData.nombre,
            validateData.apellido,
            validateData.email,
            validateData.telefono,
            validateData.dia.toISOString().split("T")[0],
            validateData.horario,
            validateData.mensaje_adicional || null,
          ],
          (error, results) => {
            if (error) {
              return res
                .status(500)
                .json({ error: "Error al insertar el turno" });
            }

            res.status(201).json({
              message: "Turno guardado con éxito",
              id: results.insertId,
            });

            transporter.sendMail({
              from: '"Carhub CEO 👻" <carhub@carhub.com>',
              to: validateData.email,
              subject: "Confirmación de turno",
              text: `Estimado/a ${validateData.nombre},
            
            ¡Gracias por elegirnos! Nos complace confirmar su turno. A continuación, encontrará los detalles de su cita:
            
            Fecha: ${validateData.dia.toISOString().split("T")[0]}  
            Hora: ${validateData.horario}  
            Lugar: [lugar del servicio]  
            Servicio: [nombre del servicio]  
            
            Si tiene alguna pregunta o necesita reprogramar su cita, no dude en contactarnos a [número de teléfono] o [correo electrónico].
            
            Agradecemos su preferencia y esperamos verle pronto.
            
            Saludos cordiales,
            Tomás
           Carhub`,
            });
          }
        );
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return res.status(400).json({ errors: formattedErrors });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

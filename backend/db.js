import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return; // Asegúrate de manejar el error de forma apropiada
  }
  console.log("Conectado a la base de datos");
});

export default db;

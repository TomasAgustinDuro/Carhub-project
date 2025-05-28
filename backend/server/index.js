import express from "express";
import cors from "cors";
import allRoutes from "../routes/routes.js";
import sequelize from "../config/Sequelize.js";
import { Car, Image } from "../models/index.js";

// TODO: Move routes to another specific file for that.
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // dev local
      "https://carhub-tau.vercel.app", // producción
    ],
    credentials: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ force: false }) // o { alter: true }
  .then(() => {
    console.log("Tablas sincronizadas");
  })
  .catch((err) => {
    console.error("Error al sincronizar:", err);
  });

allRoutes(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

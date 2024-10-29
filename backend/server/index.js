import express from "express";
import cors from "cors";
import { ReviewController } from "../controllers/Review.controller.js";
import { TurnController } from "../controllers/Turns.controller.js";
import { CarController } from "../controllers/Cars.controller.js";
import { UserController } from "../controllers/User.controller.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Obtener todos los autos
app.get("/api/cars", CarController.getAll);

// Obtener auto por id
app.get("/api/cars/:id", CarController.getById);

// Obtener reviews
app.get("/api/reviews", ReviewController.getAll);

// Enviar review
app.post("/api/reviews", ReviewController.create);

// enviar turno
app.post("/api/sellcar/turns", TurnController.create);

// Loguearse como admin
app.post("/admin/user/login", UserController.login)

// Crear usuario admin
app.post("/admin/user", UserController.create)





app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

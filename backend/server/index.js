import express from "express";
import cors from "cors";
import { ReviewController } from "../controllers/Review.controller.js";
import { TurnController } from "../controllers/Turns.controller.js";
import { CarController } from "../controllers/Cars.controller.js";
import { UserController } from "../controllers/User.controller.js";
import path from "path";

// TODO: Move routes to another specific file for that.
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Obtener todos los autos
app.get("/api/cars", CarController.getAll);

// Obtener auto por id
app.get("/api/cars/:id", CarController.getById);

// Agregar autos
app.post("/admin/cars", uploads.array("images", 20), CarController.addNewCar);

// Obtener reviews
app.get("/api/reviews", ReviewController.getAll);

// Enviar review
app.post("/api/reviews", ReviewController.create);

app.get("/api/sellcar/turns", TurnController.getAll);

// Enviar turno
app.post("/api/sellcar/turns", TurnController.create);

// Loguearse como admin
app.post("/admin/user/login", UserController.login);

// Crear usuario admin
app.post("/admin/user", UserController.create);

// Editar un auto como admin
app.put("/admin/cars/:id", CarController.editCar);

// Borrar un auto como admin
app.delete("/admin/cars/:id", CarController.deleteCar);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

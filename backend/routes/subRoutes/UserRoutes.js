import UserController from "../../controllers/UserController.js";
import CarController from "../../controllers/CarsController.js";
import express from "express";

const router = express.Router();

// All to manage users
router.get("/", UserController.getAll);
router.get("/:username", UserController.getByUsername);
router.post("/login", UserController.login);
router.post("/register", UserController.registerUser);
router.post("/remove/:id", UserController.removeUser);

// All to manage web
router.delete("/cars/:id", CarController.removeCar);
router.put("cars/:id", CarController.editCar);
router.post("cars/add", UserController.addCar);

export default router;

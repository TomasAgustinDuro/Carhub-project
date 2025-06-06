import UserController from "../../controllers/UserController.js";
import CarController from "../../controllers/CarsController.js";
import express from "express";

const router = express.Router();

// All to manage users
router.get("/", UserController.getAll);
router.get("/:username", UserController.getByUsername);
router.delete("/remove/:id", UserController.removeUser);

// All to manage web
router.delete("/cars/delete/:id", CarController.removeCar);
router.put("/cars/:id", CarController.editCar);
router.post("/cars/add", CarController.addCar);

export default router;

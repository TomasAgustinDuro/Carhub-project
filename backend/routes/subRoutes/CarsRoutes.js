import { CarController } from "../../controllers/CarsController.js";
import express from "express";

const router = express.Router();

router.get("/", CarController.getAll);
router.get("/:id", CarController.getById);

export default router;

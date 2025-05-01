import { TurnController } from "../../controllers/TurnsController.js";
import express from "express";

const router = express.Router();

router.get("/", TurnController.getAll);
router.post("/create", TurnController.createTurn);
router.delete("/delete/:id", TurnController.removeTurn);

export default router;

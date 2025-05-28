import { VerifyToken } from "../../auth/auth.js";
import { TurnController } from "../../controllers/TurnsController.js";
import express from "express";

const router = express.Router();

router.get("/", VerifyToken, TurnController.getAll);
router.post("/create", TurnController.createTurn);
router.delete("/delete/:id", VerifyToken, TurnController.removeTurn);

export default router;

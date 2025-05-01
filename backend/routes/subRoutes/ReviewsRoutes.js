import { ReviewController } from "../../controllers/ReviewController.js";
import express from "express";

const router = express.Router();

router.get("/", ReviewController.getAll);
router.post("/create", ReviewController.createReview);
router.delete("/delete/:id", ReviewController.removeReview);

export default router;

import { ImageController } from "../../controllers/ImageController.js";
import express from "express";

const router = express.Router();

router.get("/", ImageController.getAll);
router.post("/create", ImageController.insertImage);
router.put("/:id", ImageController.editImage);
router.delete("/delete/:id", ImageController.removeImage);

export default router;

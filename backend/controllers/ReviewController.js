import Review from "../models/Review.js";
import { reviewSchema } from "../validation/Review.schema.js";

export class ReviewController {
  static async getAll(req, res) {
    try {
      const reviews = await Review.getAll();

      res.status(200).json(reviews); // ✅ MUY importante
    } catch (error) {
      res.status(400).json({ message: "Invalid review" });
    }
  }

  static async createReview(req, res) {
    const body = req.body;

    const validation = reviewSchema.safeParse(body);

    if (!validation.success) {
      console.log(validation.error.format());
      return;
    }

    if (!body.qualy || !body.name || !body.content) {
      return res
        .status(400)
        .json({ message: "Faltan datos necesarios: qualy, name o content" });
    }

    const newReview = {
      qualy: body.qualy,
      name: body.name,
      content: body.content,
    };

    try {
      const review = await Review.createReview(newReview);

      res.status(200).json(review); // ✅ MUY importante
    } catch (error) {
      console.error("Error al crear la reseña:", error); // Mejor visibilidad del error
      res.status(500).json({
        message: "Hubo un error al crear la reseña",
        error: error.message,
      });
    }
  }

  static async removeReview(req, res) {
    const id = req.params;

    try {
      await Review.removeReview(id);

      return console.log("borrado");
    } catch (error) {}
  }
}

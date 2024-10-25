import { ReviewModel } from "../models/Reviews.model.js";

export class ReviewController {
  static async getAll(req, res) {
    try {
      const reviews = await ReviewModel.getAll({});

      res.json(reviews);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error obteniendo autos", details: error.message }); // Proporciona detalles del error
    }
  }

  static async create(req, res) {
    try {
        const reviewData = req.body;
    
        if (!reviewData || !reviewData.user_name || !reviewData.review) {
          return res.status(400).json({ error: "Datos incompletos" });
        }
    
        const reviews = await ReviewModel.create({ body: reviewData });
    
        res.json(reviews);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Error obteniendo autos", details: error.message });
      }
  }
}

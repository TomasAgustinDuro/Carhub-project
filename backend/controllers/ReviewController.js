import Review from "../models/Review";

export class ReviewController {
  static async getAll(req, res) {
    try {
      const reviews = await Review.getAll();

      return reviews;
    } catch (error) {
      console.log(error);
    }
  }

  static async createReview(req, res) {
    const body = req.body;

    const newReview = {
      qualy: body.qualy,
      name: body.name,
      content: body.content,
    };

    try {
      const review = await Review.createReview(newReview);

      return review;
    } catch (error) {}
  }

  static async removeReview(req, res) {
    const id = req.params;

    try {
      await Review.removeReview(id);

      return console.log("borrado");
    } catch (error) {}
  }
}

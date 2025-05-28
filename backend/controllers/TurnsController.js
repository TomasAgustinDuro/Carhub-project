import Turn from "../models/Turn.js";
import { sendEmail } from "../server/mailer.js";
import { turnSchema } from "../validation/Turn.schema.js";

// TODO: validate inputs

export class TurnController {
  static async getAll(req, res) {
    try {
      const turns = await Turn.getAll();

      return res.status(200).json(turns);
    } catch (error) {
      console.log(error);
    }
  }

  static async createTurn(req, res) {
    const { car, user } = req.body;

    const newTurn = {
      brand: car.brand,
      model: car.model,
      year: car.year,
      version: car.version,
      mileage: car.mileage,
      price: car.price,
      description: car.description,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      day: new Date(user.day),
      hour: user.hour,
    };

    const validation = turnSchema.safeParse(newTurn);

    if (!validation.success) {
      return;
    }

    try {
      const turn = await Turn.createTurn(newTurn);

      await sendEmail(newTurn);

      res.status(200).json({ turn });
    } catch (error) {
      console.error("Error al reserver turno:", error);
      res.status(500).json({
        message: "Hubo un error al reserver turno",
        error: error.message,
      });
    }
  }

  static async removeTurn(req, res) {
    const { id } = req.params;
    try {
      await Turn.removeTurn(id);

      return;
    } catch (error) {
      console.log(error);
    }
  }
}

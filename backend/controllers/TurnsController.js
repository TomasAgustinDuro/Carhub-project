import Turn from "../models/Turn";
import { sendEmail } from "../server/mailer.js";

// TODO: validate inputs

export class TurnController {
  static async getAll(req, res) {
    try {
      const turns = await Turn.getAll();

      return turns;
    } catch (error) {
      console.log(error);
    }
  }

  static async createTurn(req, res) {
    const body = req.body;

    const newTurn = {
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      day: body.day,
      hour: body.hour,
      msg: body.msg,
    };
    try {
      const turn = await Turn.createTurn(newTurn);

      await sendEmail(newTurn);

      return turn;
    } catch (error) {
      console.log(error);
    }
  }

  static async removeTurn(req, res) {
    const id = req.params;
    try {
      await Turn.removeTurn(id);

      return console.log("borrado");
    } catch (error) {
      console.log(error);
    }
  }
}

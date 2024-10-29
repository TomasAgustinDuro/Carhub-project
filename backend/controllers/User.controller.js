import { UserModel } from "../models/User.model.js";

export class UserController {
  static async getByUserName(req, res) {
    try {
      const body = req.body;

      const userName = body.userName;

      const user = await UserModel.getByUsername({ userName });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const isLogin = user.isOnline;
      return res.json({ login: isLogin });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error obteniendo usuario", details: error.message });
    }
  }

  static async create(req, res) {
    try {
      const adminData = req.body;

      if (!adminData || !adminData.userName || !adminData.password) {
        return res.status(400).json({ error: "Datos incompletos" });
      }

      const admin = await UserModel.create({ body: adminData });

      res.json(admin);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error enviando datos", details: error.message });
    }
  }

  static async login(req, res) {
    try {
      const loginData = req.body;

      if (!loginData || !loginData.userName || !loginData.password) {
        return res.status(400).json({ error: "Datos incompletos" });
      }

      const loginOk = await UserModel.login({body: loginData});

      if (loginOk.error) {
        return res.status(401).json(loginOk); 
      }

      res.json(loginOk);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error iniciando sesión", details: error.message });
    }
  }
}

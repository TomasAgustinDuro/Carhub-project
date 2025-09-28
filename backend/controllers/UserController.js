import User from "../models/User.js";
import { GenerateToken } from "../auth/auth.js";
import { userSchema } from "../validation/User.schema.js";

// TODO: implement jwt

export class UserController {
  static async getAll(req, res) {
    try {
      const users = await User.getAll();

      if (!users) {
        return res.status(401).json({ message: "Usuario no encontrado" });
      }

      res.status(200).json({ users });
    } catch (error) {
      console.log(error);
    }
  }

  static async getByUsername(req, res) {
    const username = req.params;

    try {
      const user = await User.getByUsername(username);

      if (!user) {
        res.status(400).json({ message: "error usuario no encontrado" });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
    }
  }

  static async registerUser(req, res) {
    const body = req.body;

    const newUser = {
      username: body.username,
      password: body.password,
    };

    const validation = userSchema.safeParse(newUser);

    if (!validation.success) {
      res.status(400).json({ message: "error de validación" });
    }

    try {
      const user = User.registerUser(newUser);

      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req, res) {
    const body = req.body;

    const user = {
      username: body.username,
      password: body.password,
    };

    const validation = userSchema.safeParse(user);

    if (!validation.success) {
      res.status(400).json({ message: "error de validación" });
    }

    try {
      const createdUser = await User.login(user);

      if (!createdUser) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      const token = GenerateToken(createdUser.username);

      if (!token) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }

      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
    }
  }

  static async removeUser(req, res) {
    const { id } = req.params;

    try {
      await User.removeUser(id);

      return;
    } catch (error) {
      console.log(error);
    }
  }
}
export default UserController;

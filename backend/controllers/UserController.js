import User from "../models/User";

// TODO: implement jwt

export class UserController {
  static async getAll(req, res) {
    try {
      const users = await User.getAll();

      if (!users) {
        return;
      }

      return users;
    } catch (error) {
      console.log(error);
    }
  }

  static async getByUsername(req, res) {
    const username = req.params;

    try {
      const user = await User.getByUsername(username);

      if (!user) {
        return;
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async registerUser(req, res) {
    const body = req.body;

    const newUser = {
      username: body.username,
      passwrod: body.passwrod,
    };

    try {
      const user = User.registerUser(newUser);

      return user.username;
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req, res) {
    const body = req.body;

    const user = {
      username: body.username,
      passwrod: body.passwrod,
    };

    // Here also I have to return JWT token
    try {
      const userLogged = await User.login(user);

      if (!userLogged) {
        return res.status(401).json({ message: "Credenciales inválidas" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async removeUser(req, res) {
    const id = req.params;

    try {
      await User.removeUser(id);

      return console.log("borrado");
    } catch (error) {
      console.log(error);
    }
  }
}

import db from "../db.js";
import bcrypt from "bcrypt";

export class UserModel {
  static async getByUsername({ username }) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM admins WHERE username = ? ",
        [username],
        (err, results) => {
          if (err) return reject(err);

          if (results.length === 0) {
            return resolve(null);
          }

          const user = results[0];

          resolve(user);
        }
      );
    });
  }

  static async create({ body }) {
    const { userName, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO admins (username, password_hash, isOnline) VALUES (?, ?, ?)";

    return new Promise((resolve, reject) => {
      db.query(query, [userName, hashedPassword, false], (err, results) => {
        if (err) {
          return reject(err);
        } else {
          resolve("Admin creado exitosamente");
        }
      });
    });
  }

  static async login({body}) {
    return new Promise(async (resolve, reject) => {
      try {
        const { userName, password } = body;

        const user = await this.getByUsername({ username: userName });

        if (!user) {
          return resolve({ error: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
          return resolve({ error: "Contraseña incorrecta" });
        }


        const query = "UPDATE admins SET isOnline = ? WHERE id = ?";
        db.query(query, [true, user.id], (err) => {
          if (err) {
            return reject(err);
          }
          resolve({ success: "Inicio de sesión exitoso", user });
        });
      } catch (error) {
        reject(error)
      }
    });
  }
}

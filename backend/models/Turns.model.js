import db from "../db.js";
import {transporter} from "../server/mailer.js"

export class TurnModel {
  static async create({ body, day }) {
    return new Promise((resolve, reject) => {
      const firstQuery =
        "SELECT * FROM turnos WHERE DATE(dia) = ? AND horario = ?";
      const secondQuery =
        "INSERT INTO turnos (nombre, apellido, email, telefono, dia, horario, mensaje_adicional) VALUES (?, ?, ?, ?, ?, ?, ?)";

      db.query(firstQuery, [day, body.horario], (err, results) => {
        if (err) return reject(err);

        if (results.length > 0) {
          return reject({
            errors: [
              {
                field: "horario",
                message: "Turno ya reservado",
              },
            ],
          });
        }

        db.query(
          secondQuery,
          [
            body.nombre,
            body.apellido,
            body.email,
            body.telefono,
            body.dia.toISOString().split("T")[0],
            body.horario,
            body.mensaje_adicional || null,
          ],
          (err, results) => {
            if (err) return reject(err);

            resolve({
              message: "Turno guardado con éxito",
              id: results.insertId,
            });

            transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: body.email,
              subject: "Confirmación de turno",
              text: `Estimado/a ${body.nombre},
                      
                      ¡Gracias por elegirnos! Nos complace confirmar su turno. A continuación, encontrará los detalles de su cita:
                      
                      Fecha: ${body.dia.toISOString().split("T")[0]}  
                      Hora: ${body.horario}  
                      
                      Si tiene alguna pregunta o necesita reprogramar su cita, no dude en contactarnos a [número de teléfono] o [correo electrónico].
                      
                      Agradecemos su preferencia y esperamos verle pronto.
                      
                      Saludos cordiales,
                      Tomás
                      Carhub`,
            });
          }
        );
      });
    });
  }
}

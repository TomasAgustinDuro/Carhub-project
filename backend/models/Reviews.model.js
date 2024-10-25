import db from "../db.js";

export class ReviewModel {
  static async getAll({}) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM reviews", (err, results) => {
        if (err) return reject(err);

        // Formatear las fechas en los resultados
        const formattedResults = results.map((review) => {
          const date = new Date(review.date); // Crea un objeto Date a partir de la cadena
          const options = { year: "numeric", month: "long", day: "numeric" }; // Opciones de formato
          const formattedDate = date.toLocaleDateString("es-ES", options); // Formatea la fecha

          return {
            ...review,
            date: formattedDate, // Reemplaza la fecha original por la formateada
          };
        });

        resolve(formattedResults); // Envía los resultados formateados al cliente
      });
    });
  }

  static async create({ body }) {
    const query = "INSERT INTO reviews (user_name, review) VALUES (?, ?)";

    return new Promise((reject, resolve) => {
      db.query(query, [body.user_name, body.review], (err, results) => {
          if (err) {return reject(err)} else {resolve('Opinión guardada con exito')}
        }
      );
    });
  }
}

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
  },
});

export const sendEmail = async (body) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: body.email,
    subject: "Confirmación de turno",
    text: `Estimado/a ${body.name},
            
            ¡Gracias por elegirnos! Nos complace confirmar su turno. A continuación, encontrará los detalles de su cita:
            
            Fecha: ${body.day}  
            Hora: ${body.hour}  
            
            Si tiene alguna pregunta o necesita reprogramar su cita, no dude en contactarnos a [número de teléfono] o [correo electrónico].
            
            Agradecemos su preferencia y esperamos verle pronto.
            
            Saludos cordiales,
            Tomás
            Carhub`,
  });
};

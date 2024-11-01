import { TurnModel } from "../models/Turns.model.js";
import z from "zod";

export class TurnController {
  static async create(req, res) {
    const turnData = req.body;

    const formSchema = z.object({
      nombre: z
        .string()
        .min(1, "Name is required")
        .regex(/^[A-Za-zÁ-ÿ\s]+$/, "Name can only contain letters and spaces"),
      apellido: z
        .string()
        .min(1, "Lastname is required")
        .regex(
          /^[A-Za-zÁ-ÿ\s]+$/,
          "Lastname can only contain letters and spaces"
        ),
      email: z.string().email("Invalid email format"),
      telefono: z
        .string({
          required_error: "Phone is required",
          invalid_type_error: "Phone must be a valid number",
        })
        .min(10, "Phone number must have at least 10 digits")
        .max(12, "Phone number must have at most 12 digits")
        .regex(/^\d+$/, "Phone number must contain only digits"),
      dia: z
        .string({
          required_error: "Date is required",
          invalid_type_error: "Date must be a valid date",
        })
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid date format",
        })
        .transform((val) => new Date(val))
        .refine((val) => val >= new Date(), {
          message: "Date must be today or later",
        }),
      horario: z
        .string({
          required_error: "Time is required",
          invalid_type_error: "Time must be a valid time format",
        })
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:MM format")
        .refine((val) => val >= "09:00" && val <= "18:00", {
          message: "Time must be between 09:00 and 18:00",
        }),
      mensaje_adicional: z.string().optional(),
    });

    try {
      // Validación de los datos
      const validateData = formSchema.parse(turnData);
      const validateDay = validateData.dia.toISOString().substring(0, 10);

      // Llamada a TurnModel.create
      const result = await TurnModel.create({
        body: validateData,
        day: validateDay,
      });

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));
        return res.status(400).json({ errors: formattedErrors });
      }
      return res
        .status(500)
        .json({ error: "Error interno del servidor", details: error });
    }
  }

  static async getAll(req, res) {
    try {
      const turnos = await TurnModel.getAll();

      res.json(turnos);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error obteniendo turnos", details: error.message });
    }
  }
}

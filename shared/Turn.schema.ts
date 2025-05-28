import { z } from "zod";

export const turnSchema = z.object({
  car: z.object({
    brand: z
      .string({
        required_error: "Brand is obligatory",
        invalid_type_error: "must be text",
      })
      .min(2, "Brand need to be more than 2 characters"),
    model: z
      .string({
        required_error: "Model is obligatory",
        invalid_type_error: "must be text",
      })
      .min(2, "Model need to be more than 2 characters"),
    year: z
      .string({
        required_error: "Year is obligatory",
        invalid_type_error: "must be text",
      })
      .min(4, "Year need to be more than 4 characters"),
    price: z
      .string({
        required_error: "Price is obligatory",
        invalid_type_error: "must be text",
      })
      .min(1, "Price need to be more than 1 characters"),
  }),
  user: z.object({
    name: z
      .string({
        required_error: "Name is obligatory",
        invalid_type_error: "must be text",
      })
      .min(2, "Name need to be more than 2 characters"),
    lastName: z
      .string({
        required_error: "Lastname is obligatory",
        invalid_type_error: "must be text",
      })
      .min(2, "Lastname need to be more than 2 characters"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    phone: z.string().min(10, "Phone to short"),
    day: z
      .string({
        required_error: "Day is obligatory",
      })
      .min(1, "Day is required"),
    hour: z
      .string({
        required_error: "Hour is obligatory",
      })
      .min(1, "Hour is required"),
  }),
});

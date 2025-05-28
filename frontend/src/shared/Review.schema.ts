import { z } from "zod";

export const reviewSchema = z.object({
  name: z
    .string({
      required_error: "Name is obligatory",
      invalid_type_error: "must be text",
    })
    .min(2, "Name need to be more than 2 characters"),
  content: z
    .string({
      required_error: "Message is obligatory",
      invalid_type_error: "must be text",
    })
    .min(1, "Message is required"),
  qualy: z
    .number({
      required_error: "Qualy is obligatory",
      invalid_type_error: "must be number",
    })
    .min(1, "Qualy need to be more than 1"),
});

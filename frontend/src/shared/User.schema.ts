import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string({
      required_error: "username is obligatory",
      invalid_type_error: "must be text",
    })
    .min(1, "Username is required"),
  password: z
    .string({
      required_error: "password is obligatory",
      invalid_type_error: "must be text",
    })
    .min(1, "Password is required"),
});

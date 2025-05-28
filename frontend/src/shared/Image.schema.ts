import { z } from "zod";

export const imageSchema = z.object({
  url: z.string().url({ message: "Invalid url" }).min(1, "Email is required"),
  title: z.string().optional(),
  description: z.string().optional(),
});

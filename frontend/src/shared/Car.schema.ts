import { z } from "zod";
import { imageSchema } from "./Image.schema";

export const carSchema = z.object({
  brand: z
    .string({
      required_error: "brand is obligatory",
      invalid_type_error: "brand must be text",
    })
    .regex(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed in brand")
    .min(1, "Brand is required"),
  model: z
    .string({
      required_error: "model is obligatory",
      invalid_type_error: "model must be text",
    })
    .regex(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed in model")
    .min(1, "Model is required"),
  version: z
    .string({
      required_error: "version is obligatory",
      invalid_type_error: "version must be text",
    })
    .regex(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed in version")
    .min(1, "Version is required"),
  year: z
    .number({
      required_error: "price is required",
      invalid_type_error: "price must be a number",
    })
    .min(1, "Price is required"),
  transmission: z
    .string({
      required_error: "transmission is obligatory",
      invalid_type_error: "transmission must be text",
    })
    .min(1, "Transmission is required"),
  price: z
    .string({
      required_error: "price is required",
      invalid_type_error: "price must be a text",
    })
    .min(1, "Price is required"),
  fuel: z
    .string({
      required_error: "fuel is obligatory",
      invalid_type_error: "fuel must be text",
    })
    .min(1, "Fuel is required"),
  tank: z
    .string({
      required_error: "tank is obligatory",
      invalid_type_error: "tank must be text",
    })
    .min(1, "Tank is required"),
  horsePower: z
    .string({
      required_error: "horsepower is obligatory",
      invalid_type_error: "horse power must be text",
    })
    .min(1, "Horse power is required"),
  mileage: z
    .number({
      required_error: "mileage is required",
      invalid_type_error: "mileage must be a number",
    })
    .min(1, "Mileage is required"),
  doors: z
    .number({
      required_error: "doors is required",
      invalid_type_error: "doors must be a number",
    })
    .min(1, "Doors is required"),
  traction: z
    .string({
      required_error: "traction is obligatory",
      invalid_type_error: "traction must be text",
    })
    .min(1, "Traction is required"),
  wheelMaterial: z
    .string({
      required_error: "wheel material is obligatory",
      invalid_type_error: "wheel material must be text",
    })
    .min(1, "Wheel material is required"),
  wheelSize: z
    .string({
      required_error: "wheel size is obligatory",
      invalid_type_error: "wheel size must be text",
    })
    .min(1, "Wheel size is required"),
  abs: z.boolean(),
  tractionControl: z.boolean(),
  radio: z.boolean(),
  bluetooth: z.boolean(),
  usb: z.boolean(),
  images: z.array(imageSchema),
});

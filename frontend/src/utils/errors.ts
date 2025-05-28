// utils/errors.ts
import { ZodError } from "zod";

export const parseZodErrors = (error: ZodError): string[] => {
  return Object.values(error.format())
    .flatMap((field: any) => field?._errors || [])
    .filter(Boolean);
};

export const handleApiError = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (typeof error === "string") return error;

  return "Algo salió mal. Intentalo más tarde.";
};

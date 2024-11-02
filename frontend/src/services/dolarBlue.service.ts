import CustomError from "../interfaces/customError";
import axios from "axios";

export const conect = axios.create({
  baseURL: "https://dolarapi.com/v1/dolares",
});

export const getData = async () => {
  try {
    const response = await conect.get("/blue"); 
    return response.data;
  } catch (error) {
    // Verificamos si el error es de tipo AxiosError
    if (axios.isAxiosError(error)) {
      throw handleError(error);
    }
    // Si no es un AxiosError, lanzamos un error desconocido
    throw handleError({ message: "Error desconocido" } as CustomError);
  }
};

export const handleError = (error: CustomError) => {
  // Si es un AxiosError, devuelve los datos del error
  if (axios.isAxiosError(error)) {
    return error.response?.data || "Error en la solicitud";
  }
  // Manejo de errores desconocidos
  return error.message || "Error desconocido";
};

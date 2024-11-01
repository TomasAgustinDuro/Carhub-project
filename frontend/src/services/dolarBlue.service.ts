import CustomError from "../interfaces/customError";
import Dolar from "../interfaces/DolarBlue";
import axios from "axios";

export const conect = axios.create({
  baseURL: "https://dolarapi.com/v1/dolares",
});

export const getData = async () => {
  try {
    const response = await conect.get("/blue"); 
    
    return response.data;
  } catch (error) {
    throw handleError(error); 
  }
};

export const handleError = (error: CustomError) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data || "Error en la solicitud";
  }

  return "Error desconocido";
};

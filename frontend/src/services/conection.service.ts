import axios from "axios";
import CustomError from "../interfaces/customError";

export const conect = axios.create({
    baseURL: 'http://localhost:5000/',
})

export const getData = async (url: string) => {
    const response = await conect.get(url)
    console.log(response)
    return response.data
}

export const postData = async (url: string) => {
    const response = await conect.post(url)
    return response.data;
}

export const handleError = (error: CustomError ) => {
    if (axios.isAxiosError(error)) {
        return error.response?.data || 'Error en la solicitud'
    }

    return 'Error desconocido'
}



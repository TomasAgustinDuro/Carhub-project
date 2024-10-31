import axios from "axios";
import CustomError from "../interfaces/customError";

export const conect = axios.create({
    baseURL: 'http://localhost:5000/',
})

export const getData = async (url: string) => {
    const response = await conect.get(url)
    return response.data
}

export const postData = async (url: string) => {
    const response = await conect.post(url)
    return response.data;
}

export const deleteData = async(url: string) => {
    const response = await conect.delete(url)
    return response.data
}

export const editData = async(url: string, data: object) => {
    const response = await conect.put(url, data)
    return response.data
}

export const handleError = (error: CustomError ) => {
    if (axios.isAxiosError(error)) {
        return error.response?.data || 'Error en la solicitud'
    }

    return 'Error desconocido'
}



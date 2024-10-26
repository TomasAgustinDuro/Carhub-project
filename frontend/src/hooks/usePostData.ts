import { useEffect, useState } from "react";
import CustomError from "../interfaces/customError"; // Asegúrate de que esta interfaz esté definida correctamente
import { conect, handleError } from "../services/conection.service"; // Ajusta la ruta según tu estructura de carpetas

function usePostData(url: string, data: object) {
  const [error, setError] = useState<{
    type?: string;
    message: string;
    errors?: any;
  } | null>(null);

  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const postData = async () => {
      if (!data) return; // Verifica que haya datos para enviar

      try {
        const response = await conect.post(url, data);
        setSuccess(response.data);
        setError(null); 
      } catch (err) {
        const errorMessage = handleError(err as CustomError);
        setError({ message: errorMessage });
        console.error("Error en la solicitud:", errorMessage);
      }
    };

    postData();
  }, [data, url]); 

  return { error, success };
}

export default usePostData;

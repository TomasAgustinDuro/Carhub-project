import { useEffect, useState } from "react";
import { getData } from "../services/conection.service";

function useGetData<T>(url: string) {
  const [value, setValue] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Especificar el tipo de error

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(url);

        setValue(data);
      } catch (error) {
        // Convertir el error a un string o manejarlo adecuadamente
        setError((error as Error).message || "Ocurrió un error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { value, loading, error };
}

export default useGetData;

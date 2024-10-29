import { useEffect, useState } from "react";
import { getData } from "../services/conection.service";

function useGetData(url: string) {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getData(url);

        setValue(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { value, loading, error };
}
export default useGetData;

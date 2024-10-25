import { useEffect, useState } from "react";

function useConnectionDB(url: string) {
  const urlFinal = `http://localhost:5000/${url}`
  console.log(urlFinal)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(urlFinal);
        console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  console.log('db', data)

  return { data, loading, error };
}

export default useConnectionDB;

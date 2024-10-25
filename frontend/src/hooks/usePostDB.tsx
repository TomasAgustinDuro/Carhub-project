import { useEffect, useState } from "react";

function usePostDB(url: string, data: object) {
  const urlPost = `http://localhost:3001/${url}`;
  const [error, setError] = useState<{
    type?: string;
    message: string;
    errors?: any;
  } | null>(null);

  const[success, setSuccess] = useState(null)

  useEffect(() => {
    if (!data) return; // Cambié aquí a un chequeo más genérico

    fetch(urlPost, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            console.error("Error en la solicitud:", errorData);
            setError({
              message: errorData.message || "Error desconocido",
              errors: errorData.errors,
            });
          });
        }
        setError(null)
        return response.json();
      })
      .then((data) => {
        console.log("Solicitud exitosa:", data);
        setSuccess(data)
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error.message);
        setError({ message: "Ocurrió un error inesperado" });
      });
  }, [data, urlPost]); // Añadido urlPost en las dependencias

  return { error , success};
}

export default usePostDB;

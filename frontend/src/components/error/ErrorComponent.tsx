import React from "react";
import styles from "./errorComponent.module.scss";

// Interfaz para el detalle de errores individuales
interface ErrorDetail {
  message: string;
}

// Interfaz de las props del componente, incluyendo una estructura flexible para `error.message`
interface ErrorComponentProps {
  error: {
    message: 
      | {
          errors?: ErrorDetail[];
          [key: string]: any;
        }
      | string;
  };
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  // Verifica si `error.message` es un objeto antes de acceder a `errors`
  const errors = typeof error.message === "object" && "errors" in error.message
    ? error.message.errors
    : null;

  const errorMessage = typeof error.message === "string" ? error.message : "Ha ocurrido un error.";

  return (
    <div className={styles.errors}>
      {errors && errors.length > 0 ? (
        errors.map((err, index) => (
          <div key={index}>
            <span>{err.message}</span>
            <br />
          </div>
        ))
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};

export default ErrorComponent;

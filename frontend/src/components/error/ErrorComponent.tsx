import styles from "./errorComponent.module.scss";

const ErrorComponent = ({ error }) => {
  // Extraer la lista de errores desde `error.message.errors`
  const errors = error?.message?.errors;

  return (
    <div className={styles.errors}>
      <p>
        {Array.isArray(errors) && errors.length > 0 ? (
          errors.map((err, index) => (
            <span key={index}>
              {err.message}
              <br />
            </span>
          ))
        ) : (
          error?.message || "Ha ocurrido un error."
        )}
      </p>
    </div>
  );
};

export default ErrorComponent;

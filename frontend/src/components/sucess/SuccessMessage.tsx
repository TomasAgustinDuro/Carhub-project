// SuccessMessage.jsx
import styles from './success.module.scss';

const SuccessMessage = ({ success }) => (
  <div className={styles.success}>
    <p>
      {typeof success === "object" ? (
        success.message || "¡Operación exitosa!" // Ajusta según la estructura de tu respuesta
      ) : (
        <span>{success}</span> // Si por alguna razón es un string
      )}
    </p>
  </div>
);

export default SuccessMessage;

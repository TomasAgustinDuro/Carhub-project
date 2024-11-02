// SuccessMessage.tsx
import styles from './success.module.scss';

interface SuccessMessageProps {
  success: string | { message?: string };
}

const SuccessMessage = ({ success }: SuccessMessageProps) => (
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

import styles from "./basicInfoSection.module.scss";
import { Car } from "../../../../../interfaces"; // Ajusta la ruta según donde esté definida tu interfaz

interface BasicInfoSectionProps {
  data: Car[];
}

function BasicInfoSection({ data }: BasicInfoSectionProps) {
  const dataDetail = data[0]; // Asegúrate de que data tenga al menos un elemento

  return (
    <section aria-labelledby="info-basica-title">
      <h2 id="info-basica-title">Información Básica</h2>
      <div className={styles.infoBasica}>
        <div className={styles.infoItem}>
          <span className={styles.infoTitulo}>
            <strong>Ciudad</strong>
          </span>
          <span className={styles.infoDescripcion}>Buenos Aires</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoTitulo}>
            <strong>Transmisión</strong>
          </span>
          <span className={styles.infoDescripcion}>{dataDetail.transmission}</span>
        </div>
      </div>
    </section>
  );
}

export default BasicInfoSection;

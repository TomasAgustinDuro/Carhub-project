import styles from "./basicInfoSection.module.scss";
import { Car } from "../../../../../interfaces/CarInterface";

function BasicInfoSection({ data }: { data: Car }) {
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
          <span className={styles.infoDescripcion}>{data.transmission}</span>
        </div>
      </div>
    </section>
  );
}

export default BasicInfoSection;

// @ts-nocheck
import { Link } from "react-router-dom";
import styles from "./carDetails.module.scss";
import { Car } from "../../../../../types/CarType";

function CarDetails({ data }: { data: Car }) {
  const precioFormateado = Number(data.price).toLocaleString("es-ES", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });

  const kilometrosFormateado = Number(data.mileage).toLocaleString("es-ES", {
    style: "decimal",
    minimumFractionDigits: 0,
  });

  return (
    <aside className={styles.detallesAuto}>
      <article>
        <h2>{data.brand}</h2>
        <h3>{data.model}</h3>
        <p>{kilometrosFormateado} KM - Buenos Aires</p>
      </article>

      <div className={styles.precio}>
        <p>Precio Contado</p>
        <p>$ {precioFormateado}</p>
      </div>

      <div className={styles.detallesTecnicos}>
        <div className={styles.detalleItem}>
          <span className={styles.detalleTitulo}>
            <strong>Año</strong>
          </span>
          <span className={styles.detalleDescripcion}>{data.year}</span>
        </div>
        <div className={styles.detalleItem}>
          <span className={styles.detalleTitulo}>
            <strong>Versión</strong>
          </span>
          <span className={styles.detalleDescripcion}>{data.version}</span>
        </div>
        <div className={styles.detalleItem}>
          <span className={styles.detalleTitulo}>
            <strong>Transmisión</strong>
          </span>
          <span className={styles.detalleDescripcion}>{data.transmission}</span>
        </div>
      </div>

      <button
        aria-label="Reservar o agendar una visita para ver el auto"
        className={styles.detailBtn}
      >
        <Link to="/sell-car">Agenda una visita</Link>
      </button>
    </aside>
  );
}

export default CarDetails;

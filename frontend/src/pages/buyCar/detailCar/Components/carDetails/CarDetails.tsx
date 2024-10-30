import { Link } from "react-router-dom";
import styles from "./carDetails.module.scss";

function CarDetails(data) {
  const dataDetail = data.data[0];

  return (
    <aside className={styles.detallesAuto}>
      <article>
        <h3>{dataDetail.model}</h3>
        <p>{dataDetail.mileage} KM - Buenos Aires</p>
      </article>

      <div className={styles.precio}>
        <p>Precio Contado</p>
        <p>$ {dataDetail.price}</p>
        <div>
          <Link to="/dolar" className="link-black">
            Pasalo a dólares si necesitas
          </Link>
        </div>
      </div>

      <div className={styles.detallesTecnicos}>
        <div className={styles.detalleItem}>
          <span className={styles.detalleTitulo}>
            <strong>Año</strong>
          </span>
          <span className={styles.detalleDescripcion}>{dataDetail.year}</span>
        </div>
        <div className={styles.detalleItem}>
          <span className={styles.detalleTitulo}>
            <strong>Versión</strong>
          </span>
          <span className={styles.detalleDescripcion}>{dataDetail.version}</span>
        </div>
        <div className={styles.detalleItem}>
          <span className={styles.detalleTitulo}>
            <strong>Transmisión</strong>
          </span>
          <span className={styles.detalleDescripcion}>
            {dataDetail.transmission}
          </span>
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

import { Link } from "react-router-dom";
import styles from "./carDetails.module.scss";
import { Car } from "../../../../../interfaces"; // Ajusta la ruta según donde esté definida tu interfaz

interface CarDetailsProps {
  data: Car[];
}

function CarDetails({ data }: CarDetailsProps) {
  const dataDetail = data[0]; // Asegúrate de que data tenga al menos un elemento

  const precioFormateado = Number(dataDetail.price).toLocaleString("es-ES", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });

  const kilometrosFormateado = Number(dataDetail.mileage).toLocaleString("es-ES", {
    style: "decimal",
    minimumFractionDigits: 0,
  });

  return (
    <aside className={styles.detallesAuto}>
      <article>
        <h3>{dataDetail.model}</h3>
        <p>{kilometrosFormateado} KM - Buenos Aires</p>
      </article>

      <div className={styles.precio}>
        <p>Precio Contado</p>
        <p>$ {precioFormateado}</p>
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

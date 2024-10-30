import { Link } from "react-router-dom";
import styles from "./card.module.scss";
import { createCarAndAdapter } from "../../Adapters/Car.adapter";
import { FaRoad, FaCalendarAlt, FaCogs } from "react-icons/fa";

interface CardProps {
  car: ReturnType<typeof createCarAndAdapter>; // Tipo del objeto adaptado
  index: number;
}

const Card: React.FC<CardProps> = ({ car, index }) => {

  return (
    <div key={index} className={styles.card}>
      <img src={`http://localhost:5000/${car.image[0]}`} alt={`imagen de ${car.model}`} />

      <div className={styles.informationSell}>
        <h3>{car.model}</h3>

        <div className={styles.price}>
          <h2>
            <span>$ </span>
            {car.price.toLocaleString("es-ES", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0,
            })}
          </h2>
        </div>

        <div className={styles.informationFeatures}>
          <p>
            <span>
              {" "}
              <FaCalendarAlt className={styles.icon} />
            </span>
            {car.year}
          </p>
          <p>
            {" "}
            <span>
              <FaRoad className={styles.icon} />
            </span>
            {car.mileage.toLocaleString("es-AR")} km
          </p>
          <p>
            <span>
              <FaCogs className={styles.icon} />
            </span>
            {car.transmission}
          </p>
        </div>
      </div>

      <button className={styles.moreInfo}>
        <Link to={`/detail-car/${car.id}`} className="link link-white">
          View Details
        </Link>
      </button>
    </div>
  );
};

export default Card;

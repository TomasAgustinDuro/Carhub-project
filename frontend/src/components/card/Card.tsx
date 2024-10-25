import { Link } from "react-router-dom";
import styles from "./card.module.scss";
import Auto from "../../interfaces/auto";
import { FaRoad, FaCalendarAlt, FaCogs } from "react-icons/fa";

interface CardSellProps {
  car: Auto;
  index: number;
}

const CardSell: React.FC<CardSellProps> = ({ car, index }) => {
  return (
    <div key={index} className={styles.cardSell}>
      <img src={car.images} alt={`imagen de ${car.model}`} />

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

export default CardSell;

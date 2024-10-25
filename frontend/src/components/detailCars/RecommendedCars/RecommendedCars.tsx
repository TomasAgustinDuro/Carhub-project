
import CardSell from "../../card/Card";
import { useEffect } from "react";
import Auto from "../../../interfaces/auto";
import styles from "./recommendedCars.module.scss";
import useConnectionDB from "../../../hooks/dolar/connection_db";

function RecommendedCars() {
  const {data} = useConnectionDB('api/cars')

  return (
    <section aria-labelledby="precios-title" className={styles.containerRecommendedCars}>
      <h2 id="precios-title">Precios Similares</h2>
      <div className={styles.recommendedCars}>
        {!data ? 'error': data.filter((_: Auto, index: number) => index < 5).map((car: Auto, index: number) => (
          <CardSell key={car.id} car={car} index={index} />
        ))}
      </div>
    </section>
  );
}

export default RecommendedCars;

import styles from "./recommendation.module.scss"
import Auto from '../../../interfaces/auto'
import CardSell from "../../card/Card"
import useConnectionDB from "../../../hooks/dolar/connection_db";

function Recommendation() {
  const {data} = useConnectionDB('api/cars')

  return (
    <div className={styles.recommendation}>
      <h1 className={styles.title}>Recomendaciones</h1>

      <div className={styles.recomendationContainer}>
        {!data ? 'error' :data.filter((_: Auto, index: number) => index < 5).map((car: Auto, index: number) => {
          return (
              <CardSell key={index} car={car} index={index} />
          );
        })}
      </div>
    </div>
  );
}
export default Recommendation;

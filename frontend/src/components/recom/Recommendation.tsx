import styles from "./recommendation.module.scss";
import Car from "../../interfaces/Car";
import Card from "../card/Card";
import useGetData from "../../hooks/useGetData";
import { createCarAndAdapter } from "../../Adapters/Car.adapter";
import {Loader, ErrorComponent} from "../../components/";

interface RecommendationProps {
  title: string;
}

function Recommendation({ title }: RecommendationProps) {
  const { value: data, loading, error } = useGetData("api/cars");

  return (
    <section
      aria-labelledby="precios-title"
      className={styles.containerRecommended}
    >
      <h2 id="precios-title">{title}</h2>
      <div className={styles.recommended}>
        {loading ? (
          <Loader />
        ) : (
          data
            .filter((_: Car, index: number) => index < 5)
            .map((car: Car, index: number) => (
              <Card key={car.id} car={createCarAndAdapter(car)} index={index} />
            ))
        )}

        {error && <ErrorComponent error={error} />}
      </div>
    </section>
  );
}
export default Recommendation;

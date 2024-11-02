import styles from "./recommendation.module.scss";
import Car from "../../interfaces/Car";
import Card from "../card/Card";
import useGetData from "../../hooks/useGetData";
import { createCarAndAdapter } from "../../Adapters/Car.adapter";
import { Loader, ErrorComponent } from "../../components/";

interface RecommendationProps {
  title: string;
}

function Recommendation({ title }: RecommendationProps) {
  const { value, loading, error } = useGetData("api/cars");

  const data = (value as Car[]) || [];

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
            .filter((_, index) => index < 5)
            .map((car: Car, index: number) => (
              <Card key={car.id} car={createCarAndAdapter(car)} index={index} />
            ))
        )}

        {error && <ErrorComponent error={{message: 'Error obteniendo autos'}} />}
      </div>
    </section>
  );
}

export default Recommendation;

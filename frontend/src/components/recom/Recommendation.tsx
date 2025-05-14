import styles from "./recommendation.module.scss";
import { Car } from "../../interfaces/CarInterface";
import Card from "../card/Card";
import { useGetCars } from "../../services/conection.service";

function Recommendation({ title }: { title: string }) {
  const { data } = useGetCars();

  return (
    <section
      aria-labelledby="precios-title"
      className={styles.containerRecommended}
    >
      <h2 id="precios-title">{title}</h2>
      <div className={styles.recommended}>
        {data
          ? data
              .filter((_: any, index: number) => index < 5)
              .map((car: Car) => <Card key={car.id} car={car} />)
          : "error"}
      </div>
    </section>
  );
}

export default Recommendation;

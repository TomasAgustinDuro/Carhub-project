import styles from "./detailCar.module.scss";
import CarDetails from "./Components/carDetails/CarDetails";
import FeaturesSection from "./Components/FeaturesSection/FeaturesSection";
import { Recommendation, Loader, Gallery } from "../../../components";
import { useParams } from "react-router-dom";
import { useGetCarById } from "../../../services/conection.service";

function DetailCar() {
  const { id } = useParams();

  if (!id) {
    return;
  }
  const { data } = useGetCarById(id);

  if (!data) {
    return <Loader />;
  }

  return (
    <main>
      {data ? (
        <div>
          <section aria-labelledby="galeria-title" className={styles.galeria}>
            <Gallery images={data.images} />

            <CarDetails data={data} />
          </section>
          <FeaturesSection data={data} />
          <Recommendation title={"Recomendaciones"} />
        </div>
      ) : (
        "no hay auto"
      )}
    </main>
  );
}

export default DetailCar;

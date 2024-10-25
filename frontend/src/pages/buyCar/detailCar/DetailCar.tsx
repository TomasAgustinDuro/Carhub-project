import styles from "./detailCar.module.scss";
import Gallery from "../../../components/gallery/Gallery";
import CarDetails from "../../../components/detailCars/carDetails/CarDetails";
import BasicInfoSection from "../../../components/detailCars/basiInfoSection/BasicInfoSection";
import FeaturesSection from "../../../components/detailCars/FeaturesSection/FeaturesSection";
import RecommendedCars from "../../../components/detailCars/RecommendedCars/RecommendedCars";
import { useParams } from "react-router-dom";
import useConnectionDB from "../../../hooks/dolar/connection_db";

function DetailCar() {
  const { id } = useParams();

  const { data } = useConnectionDB(`api/cars/${id}`);
  if (!data) {
    return <div className={styles.loader}></div>; // Mostrar un mensaje de carga mientras no hay datos
  }

  return (
    <main>
      <section aria-labelledby="galeria-title" className={styles.galeria}>
        <Gallery images={data[0].images} />

        <CarDetails data={data} />
      </section>
      <BasicInfoSection data={data} />
      <FeaturesSection data={data} />
      <RecommendedCars data={data} />
    </main>
  );
}

export default DetailCar;

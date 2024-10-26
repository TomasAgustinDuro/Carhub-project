import styles from "./detailCar.module.scss";
import Gallery from "../../../components/gallery/Gallery";
import CarDetails from "./Components/carDetails/CarDetails";
import BasicInfoSection from "./Components/basiInfoSection/BasicInfoSection";
import FeaturesSection from "./Components/FeaturesSection/FeaturesSection";
import Recommendation from "../../../components/recom/Recommendation";
import { useParams } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Loader from "../../../components/Loader/loader";

function DetailCar() {
  const { id } = useParams();

  const { value: data, loading, error } = useGetData(`api/cars/${id}`);
  if (!data) {
    return <Loader />;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error al cargar los datos del coche.</div>; // Muestra un mensaje de error
  }

  // Asegúrate de que data tenga la estructura correcta
  if (!data) {
    return <div>No se encontraron datos.</div>;
  }

  return (
    <main>
      <section aria-labelledby="galeria-title" className={styles.galeria}>
        <Gallery images={data[0].images} />

        <CarDetails data={data} />
      </section>
      <BasicInfoSection data={data} />
      <FeaturesSection data={data} />
      <Recommendation title={'Recomendaciones'}/>
    </main>
  );
}

export default DetailCar;

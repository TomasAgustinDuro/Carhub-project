// @ts-nocheck
import styles from "./detailCar.module.scss";
import { BasicInfoSection, CarDetails, FeaturesSection } from "./Components";
import { Recommendation, Loader, Gallery, ErrorComponent } from "../../../components";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks";

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
    {error && <ErrorComponent error={{message: 'Error obteniendo autos'}} />}
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
      <Recommendation title={"Recomendaciones"} />
    </main>
  );
}

export default DetailCar;

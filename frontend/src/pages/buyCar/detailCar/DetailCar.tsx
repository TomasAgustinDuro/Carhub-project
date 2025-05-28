// import styles from "./detailCar.module.scss";
import CarDetails from "./Components/CarDetails";
import FeaturesSection from "./Components/FeaturesSection";
import ResumeFeatures from "./Components/ResumeFeatures";
import { Loader, Gallery } from "../../../components";
import { useParams } from "react-router-dom";
import { useGetCarById } from "../../../services/conection.service";
import QuestionCars from "./Components/QuestionsCar";
import { capitalizeCar } from "../../../utils/capitalizeCar";

function DetailCar() {
  const { id } = useParams();

  if (!id) {
    return;
  }
  const { data, isPending } = useGetCarById(id);

  if (!data) {
    return <Loader />;
  }

  const carData = capitalizeCar(data);

  return (
    <main>
      {isPending ? (
        <Loader />
      ) : carData ? (
        <div className="flex flex-col lg:flex-row gap-8 my-10 mx-5">
          <section
            aria-labelledby="galeria-title"
            className="w-full lg:w-2/3 flex flex-col gap-6"
          >
            {carData.images ? <Gallery images={carData.images} /> : <Loader />}

            <FeaturesSection data={carData} />

            <ResumeFeatures carData={carData} />

            {/* Some questions abouts this car */}
            <QuestionCars />
          </section>

          <aside className="w-full lg:w-1/3 ">
            <CarDetails data={data} />
          </aside>
        </div>
      ) : (
        <div className="p-5 w-full h-1/2 bg-gray-100 text-center">
          <h3>Este auto no está disponible</h3>
        </div>
      )}
    </main>
  );
}

export default DetailCar;

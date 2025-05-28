import { Car } from "../../interfaces/CarInterface";
import Card from "../card/Card";
import { Loader } from "..";
import { useGetCars } from "../../services/conection.service";
import { capitalizeCar } from "../../utils/capitalizeCar";

function Recommendation() {
  const { data, isPending } = useGetCars();

  return (
    <section className="">
      <div className="flex gap-2 p-2 flex-col lg:flex-row">
        {isPending ? (
          <Loader />
        ) : data ? (
          data
            .filter((_: any, index: number) => index < 5)
            .map((car: Car) => <Card key={car.id} car={capitalizeCar(car)} />)
        ) : (
          <div className="p-5 w-full h-1/2 bg-gray-100 text-center">
            <h3>No hay autos disponibles</h3>
          </div>
        )}
      </div>
    </section>
  );
}

export default Recommendation;

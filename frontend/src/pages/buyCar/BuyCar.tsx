import {
  useGetCars,
  useGetFilteredCars,
} from "../../services/conection.service";
import { useState } from "react";
import { Loader } from "../../components";
import { Filters } from "../../components";
import { Card } from "../../components";
import { FiltersType } from "../../interfaces/FilterInterface";
import { Car } from "../../interfaces/CarInterface";
import { capitalizeCar } from "../../utils/capitalizeCar";

function BuyCar() {
  const [filteredCars, setFilteredCars] = useState<Car[] | null>(null);
  const { mutate, isPending: isFiltering } = useGetFilteredCars();
  const { data, isPending: isLoadingCars } = useGetCars();

  const handleFilter = async (filters: FiltersType) => {
    const cleanedPayload = Object.fromEntries(
      Object.entries(filters).filter(([value]) => {
        if (typeof value === "string") return value !== "";
        if (typeof value === "number") return value !== 0;
        if (typeof value === "boolean") return value === true;
        return false;
      })
    );

    mutate(cleanedPayload, {
      onSuccess: (response) => {
        setFilteredCars(response.cars);
      },
    });
  };

  const handleOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const order = e.target.value;

    if (filteredCars) {
      const sortedCars = [...filteredCars].sort((a, b) =>
        order === "mayor" ? b.price - a.price : a.price - b.price
      );

      setFilteredCars(sortedCars);
    } else {
      const sortedCars = data
        ? [...data].sort((a, b) =>
            order === "mayor" ? b.price - a.price : a.price - b.price
          )
        : [];

      setFilteredCars(sortedCars);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-5 gap-5">
      <Filters onFilter={handleFilter} />

      <div className="flex flex-col w-full">
        <div className="flex justify-between py-5 ">
          <p className="font-semibold text-gray-500 text-md">
            {filteredCars ? filteredCars.length : data?.length} autos
            encontrados{" "}
          </p>

          <div>
            <select
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
              onChange={handleOrder}
            >
              <option value="mayor">Mayor a menor valor</option>
              <option value="menor">Menor a mayor valor</option>
            </select>
          </div>
        </div>
        <div className="flex gap-5 flex-col mb-10 flex-wrap lg:flex-row w-full">
          {isLoadingCars || isFiltering ? (
            <Loader />
          ) : (filteredCars ?? data)?.length > 0 ? (
            (filteredCars ?? data).map((car: Car) => (
              <Card key={car.id} car={capitalizeCar(car)} />
            ))
          ) : (
            <div className="p-5 flex items-center justify-center w-full h-1/2 bg-gray-100 text-center">
              <h3>No hay autos disponibles</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyCar;

import {
  useGetCars,
  useGetFilteredCars,
} from "../../services/conection.service";
import { useState } from "react";
import { Filters } from "../../components";
import { Card } from "../../components";
import { FiltersType } from "../../interfaces/FilterInterface";
import { Car } from "../../interfaces/CarInterface";

function BuyCar() {
  const [filteredCars, setFilteredCars] = useState<Car[] | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const { mutate, data: car } = useGetFilteredCars();
  const { data } = useGetCars();

  if (car) {
    console.log("data", car.cars);
  }

  const handleFilter = async (filters: FiltersType) => {
    const cleanedPayload = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => {
        if (typeof value === "string") return value !== "";
        if (typeof value === "number") return value !== 0;
        if (typeof value === "boolean") return value === true;
        return false;
      })
    );

    mutate(cleanedPayload, {
      onError: (error: any) => {
        const message =
          error.response?.data?.message || error.message || "Error inesperado";

        setErrors([message]);
      },
      onSuccess: (response) => {
        console.log("Filtrados:", response.cars);
        setFilteredCars(response.cars); // 🔥 ahora sí
        setErrors([]);
      },
    });
  };

  return (
    <div>
      <Filters onFilter={handleFilter} />

      {(filteredCars ?? data)?.length > 0 ? (
        (filteredCars ?? data).map((car: Car) => (
          <Card key={car.id} car={car} />
        ))
      ) : (
        <p>No hay autos</p>
      )}

      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BuyCar;

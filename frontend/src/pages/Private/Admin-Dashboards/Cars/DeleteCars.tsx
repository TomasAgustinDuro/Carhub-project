import { Car } from "../../../../interfaces/CarInterface";
import {
  useDeleteCars,
  useGetCars,
} from "../../../../services/conection.service";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const AllCars = () => {
  const { data } = useGetCars();
  const { mutate } = useDeleteCars();
  const [errors, setErrors] = useState<string[]>([]);

  const precioFormateado = (price: number) => {
    return Number(price).toLocaleString("es-ES", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    });
  };

  const kilometrosFormateado = (km: number) => {
    return Number(km).toLocaleString("es-ES", {
      style: "decimal",
      minimumFractionDigits: 0,
    });
  };

  const handleDeleteCar = async (id: string) => {
    try {
      mutate(id, {
        onError: (error: any) => {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Error inesperado";

          setErrors([message]);
        },
        onSuccess: () => {
          setErrors([]);
          window.location.reload();
        },
      });
    } catch (error) {
      console.error("Error agregando auto:", error);
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-xl mb-5">Inventario de autos</h2>

      <div className="border border-gray-200 shadow-md hover:bg-gray-100">
        {data ? (
          data.map((car: Car) => (
            <div
              key={car.id}
              className="flex p-4 lg:flex-row flex-col justify-between gap-5"
            >
              {car.images && car.images.length > 0 ? (
                <img
                  src={car.images[0].url}
                  alt="Foto del auto"
                  className="w-1/6"
                />
              ) : (
                <p>No hay fotos</p>
              )}

              <div className="flex text-center gap-2">
                {/* Brand / Model / Transmission / Fuel */}
                <div className="flex flex-col">
                  <div className="flex gap-1">
                    <p>{car.brand}</p>
                    <p>{car.model}</p>
                    <p>{car.year}</p>
                  </div>
                  <div className="flex gap-1 text-sm font-light">
                    <p>{car.transmission}</p>
                    <span>•</span>
                    <p>{car.fuel}</p>
                  </div>
                </div>

                <p>${precioFormateado(car.price)}</p>

                <p>{kilometrosFormateado(car.mileage)} KM</p>
              </div>

              <div className="flex my-auto">
                <button
                  className="p-3 h-1/2 cursor-pointer rounded flex items-center border border-gray-200 shadow-md"
                  onClick={() =>
                    (window.location.href = `/admin/cars/edit/${car.id}`)
                  }
                >
                  <HiOutlinePencilSquare className="text-xl" />
                </button>
                <button
                  className="p-3 h-1/2 cursor-pointer
                   rounded flex items-center border border-gray-200 shadow-md"
                  onClick={() => handleDeleteCar(car.id)}
                >
                  <IoTrashOutline className="text-red-600 text-xl" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-5 w-full h-1/2 bg-gray-100 text-center">
            <h3>No hay autos disponibles</h3>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllCars;

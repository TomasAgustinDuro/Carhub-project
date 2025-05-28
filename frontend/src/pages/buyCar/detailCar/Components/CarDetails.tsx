// @ts-nocheck
import { Link } from "react-router-dom";
import styles from "./carDetails.module.scss";
import { Car } from "../../../../../types/CarType";
import { FaCarSide } from "react-icons/fa";
import { capitalizeCar } from "../../../../utils/capitalizeCar";
import { useGetCars } from "../../../../services/conection.service";

function CarDetails({ data }: { data: Car }) {
  const { data: allCars } = useGetCars();

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

  if (!allCars) {
    return;
  }

  return (
    <aside className="flex flex-col w-full gap-10">
      <article className="p-4 shadow-lg rounded flex flex-col">
        {/* First section with some specific details like price */}
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl text-blue-400">
            ${precioFormateado(data.price)}
          </h2>

          <div className="p-2 font-light text-center shadow-md rounded-full flex flex-col gap-2">
            Precio contado
          </div>
        </div>

        {/* Contact with owner */}
        <button className="rounded bg-blue-500 w-1/2 mx-auto p-2 my-5 text-white hover:bg-blue-600">
          Contactar al vendedor
        </button>

        {/* Save visit */}
        <Link
          role="button"
          className="border rounded border-gray-300 w-1/2 adow-md !text-gray-500  mx-auto p-2 text-center hover:bg-gray-300 hover:!text-white"
          to="/sell-car"
        >
          Agenda una visita
        </Link>
      </article>

      {/* Detail of carhub and his stock */}
      <div className="p-3 shadow-md flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <span className="rounded-full bg-blue-200 p-3">
            <FaCarSide />
          </span>
          <p className="font-bold text-lg">Carhub Oficial</p>
        </div>
        <div className="flex  flex-col gap-3">
          <p className="flex justify-between">
            <strong>Vehiculos publicados:</strong>
            {allCars.length}
          </p>
          <p className="flex justify-between">
            <strong>Vehiculos vendidos:</strong>90
          </p>
        </div>
      </div>

      {/* Recommended cars */}
      <article className="p-4 rounded flex flex-col gap-4">
        <h2 className="font-semibold text-center text-2xl mb-5">
          Autos destacados
        </h2>

        <div className="flex flex-col gap-2">
          {allCars?.slice(0, 5).map((car, index) => {
            const capitalizedCar = capitalizeCar(car);

            return (
              <div className="flex gap-2 items-center shadow-sm">
                {capitalizeCar.images?.[0]?.url ? (
                  <img
                    src={capitalizedCar.images[0].url}
                    alt=""
                    className="w-1/6"
                  />
                ) : (
                  <p>No hay fotos</p>
                )}

                <div>
                  <p className="font-semibold ">
                    {capitalizedCar.brand} {""} {capitalizedCar.model} {""}{" "}
                    {capitalizedCar.version}
                  </p>
                  <p className="font-light">
                    {capitalizedCar.year} {""}{" "}
                    {kilometrosFormateado(capitalizedCar.mileage)} KM
                  </p>
                  <p className="font-semibold !text-blue-400 ">
                    ${precioFormateado(capitalizedCar.price)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </aside>
  );
}

export default CarDetails;

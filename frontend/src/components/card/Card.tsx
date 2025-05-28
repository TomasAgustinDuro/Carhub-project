import { Link } from "react-router-dom";
import { Car } from "../../interfaces/CarInterface";

const Card = ({ car }: { car: Car }) => {
  const precioFormateado = Number(car.price).toLocaleString("es-ES", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });

  if (car.images.length === 0) {
    return;
  }

  return (
    <div className="flex flex-col w-1/4 h-full shadow-lg border-2 border-gray-300 rounded-lg">
      {car.images.length > 0 ? (
        <img
          src={car.images[0].url}
          alt={`imagen de ${car.brand}`}
          className="w-full h-60"
        />
      ) : (
        `No hay imagenes de ${car.brand}`
      )}
      <div className="p-4 flex flex-col gap-2 ">
        <div className="flex flex-col justify-between items-center text-center text-xl font-semibold">
          <h3>{`${car.brand} ${car.model} ${car.year}`}</h3>

          <p className="font-semibold text-sm !text-blue-600">
            <span>$</span>
            {precioFormateado}
          </p>
        </div>

        <div className="font-light text-lg flex gap-2 text-center justify-center">
          <p>{car.mileage.toLocaleString("es-AR")} km</p>
          <span>•</span>
          <p>{car.transmission}</p>
        </div>

        <Link
          to={`/detail-car/${car.id}`}
          className="bg-white border-2 border-gray-300 rounded-lg px-4 py-2 w-40 mx-auto my-4 text-gray-600 text-center hover:bg-blue-500 hover:text-white transition hover:border-none duration-300 ease-in-out"
          role="button"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;

import { Car } from "../../../../interfaces/CarInterface";
import { FaRegCalendar } from "react-icons/fa";
import { LiaCarSideSolid } from "react-icons/lia";
import { LuFuel } from "react-icons/lu";

function ResumeFeatures({ carData }: { carData: Car }) {
  const kilometrosFormateado = (km: number) => {
    return Number(km).toLocaleString("es-ES", {
      style: "decimal",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div>
      {/* new component with a resume for features */}
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-2xl">
          {carData.brand} {""} {carData.model} {""} {carData.version}
        </h2>

        <div className="flex gap-3">
          <div className="border-1 border-gray-300 rounded-full p-2 items-center  text-xs shadow-md flex gap-2">
            <FaRegCalendar /> {""}
            {carData.year}
          </div>
          <div className="border-1 border-gray-300 rounded-full p-2 items-center  text-xs shadow-md flex gap-2">
            <LiaCarSideSolid /> {""}
            {kilometrosFormateado(carData.mileage)} KM
          </div>
          <div className="border-1 border-gray-300 rounded-full p-2 items-center  text-xs shadow-md flex gap-2">
            <LuFuel />
            {carData.fuel}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeFeatures;

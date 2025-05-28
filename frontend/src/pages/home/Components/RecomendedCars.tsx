import { Recommendation } from "../../../components";
import { Link } from "react-router-dom";

function RecomendedCars() {
  return (
    <div>
      <div>
        <h2 className="text-center font-bold text-3xl mx-auto my-10 p-10">
          Autos recomendados
        </h2>
        <Recommendation />

        <Link
          className="bg-[#005cb9] text-white text-lg w-50 rounded-lg px-4 py-2 text-center block mx-auto my-10"
          to="/buy-car"
        >
          Ver más autos
        </Link>
      </div>
    </div>
  );
}

export default RecomendedCars;

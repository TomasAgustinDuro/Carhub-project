import Sell from "./Components/Sell";
import RecomendedCars from "./Components/RecomendedCars";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Presentation */}
      <section>
        <div>
          <div className="flex p-5 flex-col justify-center items-center gap-15 bg-black/70 backdrop-blur-sm text-white h-screen">
            <h2 className="text-5xl font-bold text-center">
              Compra o vende tu auto
            </h2>
            <p className="font-light text-center text-2xl">
              La plataforma lider en compra y venta de autos en el país.
            </p>
            <div className="flex gap-10">
              <button
                type="button"
                className="bg-blue-500 rounded-lg px-4 py-2"
              >
                <Link to="/buy-car">Elegi tu auto</Link>
              </button>
              <button
                type="button"
                className="border-2 border-white rounded-lg px-4 py-2"
              >
                <Link to="/sell-car">Vender tu auto</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      <RecomendedCars />

      <Sell />

      {/* Ready? */}
      <section>
        <div className="bg-[#005cb9] text-white flex flex-col p-5 lg: h-100 justify-center items-center gap-10">
          <h3 className="font-bold text-3xl">
            ¿Listo para encontrar tu próximo auto?
          </h3>
          <p className="font-light text-2xl">
            Miles de opciones te esperan. Encuentra el vehículo perfecto para ti
            hoy mismo.
          </p>

          <div className="flex justify-center items-center gap-10">
            <Link
              className="border-2 border-white bg-white text-black rounded-lg px-4 py-2"
              to="/buy-car"
            >
              Buscar autos
            </Link>
            <Link
              className="border-2 border-white rounded-lg px-4 py-2"
              to="/sell-car"
            >
              Vender tu auto
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

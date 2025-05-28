import { Link, Outlet } from "react-router-dom";
import {
  useGetCars,
  useGetTurns,
} from "../../../../services/conection.service";
import { Accordion, Loader } from "../../../../components";
import { useState } from "react";
import DeleteCars from "../Cars/DeleteCars";

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: cars, isPending: gettingCars } = useGetCars();
  const { data: turns, isPending: gettingTurns } = useGetTurns();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <section className="flex w-full my-5">
      <main className="w-full flex flex-col lg:flex-row">
        <aside className="hidden lg:w-1/4 lg:block lg:shadow-m">
          <Accordion
            question="Users"
            answer={[
              <Link to="/admin/user/create">Crear usuario</Link>,
              <Link to="/admin/user/manage">Administrar usuarios</Link>,
            ]}
          />
          <Accordion
            question="Autos"
            answer={[
              <Link to="/admin/cars/delete">Todos los autos</Link>,
              <Link to="/admin/cars/">Agregar un auto</Link>,
            ]}
          />
          <Accordion
            question="Turnos"
            answer={[<Link to="/admin/turns/">Todos los turnos</Link>]}
          />
        </aside>
        {/* Mobile Menu */}

        <div className="flex justify-center  flex-col w-full">
          {/* Header  */}
          <div className="flex justify-between text-center gap-5 items-center p-5">
            <button
              onClick={toggleMenu}
              className="cursor-pointer lg:hidden flex flex-col gap-1 p-2"
            >
              <span className="w-6 h-0.5 bg-black"></span>
              <span className="w-6 h-0.5 bg-black"></span>
              <span className="w-6 h-0.5 bg-black"></span>
            </button>

            <div>
              <h3 className="font-semibold text-xl">Dashboard</h3>
              <p className="font-light">
                Bienvenido al panel de administración de Carhub.
              </p>
            </div>

            <Link
              to="/admin/cars"
              role="button"
              className="bg-blue-400 w-1/4 p-2 text-center rounded flex items-center justify-center text-white font-bold hover:bg-blue-500"
            >
              + Nuevo auto
            </Link>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden bg-white shadow-md p-5">
              <Accordion
                question="Users"
                answer={[
                  <Link to="/admin/user/create" onClick={handleLinkClick}>
                    Crear usuario
                  </Link>,
                  <Link to="/admin/user/manage" onClick={handleLinkClick}>
                    Administrar usuarios
                  </Link>,
                ]}
              />
              <Accordion
                question="Autos"
                answer={[
                  <Link to="/admin/cars/delete" onClick={handleLinkClick}>
                    Todos los autos
                  </Link>,
                  <Link to="/admin/cars/" onClick={handleLinkClick}>
                    Agregar un auto
                  </Link>,
                ]}
              />
              <Accordion
                question="Turnos"
                answer={[
                  <Link to="/admin/turns/" onClick={handleLinkClick}>
                    Todos los turnos
                  </Link>,
                ]}
              />
            </div>
          )}
          {/* Cards */}
          <div className="flex flex-col gap-5 m-5">
            <div className="border border-gray-200 shadow-md p-5 flex flex-col items-center ">
              <p>Autos en inventario</p>

              {/* Replace with allCars.length */}
              <p className="text-2xl font-bold">{cars?.length}</p>
            </div>

            <div className="border border-gray-200 shadow-md p-5 flex flex-col items-center ">
              <p>Turnos pendientes</p>

              {/* Replace with allCars.length */}
              <p className="text-2xl font-bold">{turns?.length}</p>
            </div>
          </div>

          {/* Outlet for nested routes */}
          <div className="shadow-md p-5 m-5 border border-gray-200">
            {gettingTurns || gettingCars ? <Loader /> : <Outlet />}
          </div>
        </div>
      </main>
    </section>
  );
}

export default Dashboard;

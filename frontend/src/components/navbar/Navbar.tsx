import { useState } from "react"; // Importa useState

import Dropdown from "../dropdown/Dropdown";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleLinkClick = () => setIsMenuOpen(false);

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-white shadow-md p-2 relative">
        <div className="w-1/5 lg:w-1/12">
          <Link to="/">
            <img src={logo} alt="logo" className="cursor-pointer" />
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className="cursor-pointer lg:hidden flex flex-col gap-1 p-2"
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>

        <ul className="hidden lg:flex gap-6 items-center">
          <li>
            <Link
              to="/buy-car"
              className="link link-black focus:font-semibold focus:text-blue-500"
              onClick={handleLinkClick}
            >
              Comprá un auto
            </Link>
          </li>
          <li>
            <Link
              to="/sell-car"
              className="link link-black focus:font-semibold focus:text-blue-500"
              onClick={handleLinkClick}
            >
              Vendé tu auto
            </Link>
          </li>
          <li>
            <Dropdown
              initialState={"Nosotros"}
              options={[
                { label: "Preguntas frecuentes", path: "/preguntas" },
                { label: "Opiniones", path: "/reviews" },
                { label: "Historia", path: "/history" },
              ]}
              onOptionSelect={handleLinkClick}
            />
          </li>
          <li>
            {token ? (
              <button onClick={handleLogout}>Cerrar sesión</button>
            ) : (
              <Link to="/login">Iniciar sesión</Link>
            )}
          </li>
        </ul>

        {/* Menú Mobile */}
        {isMenuOpen && (
          <ul className="absolute top-full left-0 w-full flex flex-col gap-4 bg-white p-4 shadow-md lg:hidden z-50">
            <li>
              <Link
                to="/buy-car"
                className="link link-black focus:font-semibold focus:text-blue-500"
                onClick={handleLinkClick}
              >
                Comprá un auto
              </Link>
            </li>
            <li>
              <Link
                to="/sell-car"
                className="link link-black focus:font-semibold focus:text-blue-500"
                onClick={handleLinkClick}
              >
                Vendé tu auto
              </Link>
            </li>
            <li>
              <Dropdown
                initialState={"Nosotros"}
                options={[
                  { label: "Preguntas frecuentes", path: "/preguntas" },
                  { label: "Opiniones", path: "/reviews" },
                  { label: "Historia", path: "/history" },
                ]}
                onOptionSelect={handleLinkClick}
              />
            </li>
            <li>
              {token ? (
                <button onClick={handleLogout}>Cerrar sesión</button>
              ) : (
                <Link to="/login">Iniciar sesión</Link>
              )}
            </li>
          </ul>
        )}
      </nav>
    </>
  );
}

export default Navbar;

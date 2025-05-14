import { useState } from "react"; // Importa useState
import styles from "./navbar.module.scss";
import Dropdown from "../dropdown/Dropdown";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú

  const token = localStorage.getItem("token");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Cierra el menú al hacer clic en un enlace
  };

  const handleLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <>
      <nav className={styles.nav}>
        <div>
          <h1>
            <Link to="/" className="link link-black">
              {/* <img src={logo} alt="" /> */}
            </Link>
          </h1>
        </div>
        <button className={styles.menuButton} onClick={toggleMenu}>
          <span
            className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}
          ></span>
          <span
            className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}
          ></span>
        </button>
        <ul className={`${styles.menu} ${isMenuOpen ? styles.active : ""}`}>
          <li>
            <Link
              to="/buy-car"
              className="link link-black"
              onClick={handleLinkClick}
            >
              Comprá un auto
            </Link>
          </li>
          <li>
            <Link
              to="/sell-car"
              className="link link-black"
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
      </nav>
    </>
  );
}

export default Navbar;

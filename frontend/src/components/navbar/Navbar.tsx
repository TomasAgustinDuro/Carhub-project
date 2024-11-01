import { useState } from "react"; // Importa useState
import styles from "./navbar.module.scss";
import Dropdown from "../dropdown/Dropdown";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false); // Cierra el menú al hacer clic en un enlace
  };

  return (
    <>
      <nav className={styles.nav}>
        <div>
          <h1>
            <Link to="/" className="link link-black">Carhub</Link>
          </h1>
        </div>
        <button className={styles.menuButton} onClick={toggleMenu}>
          <span className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}></span>
          <span className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}></span>
          <span className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}></span>
        </button>
        <ul className={`${styles.menu} ${isMenuOpen ? styles.active : ""}`}>
          <li>
            <Link to="/buy-car" className="link link-black" onClick={handleLinkClick}>
              Comprá un auto
            </Link>
          </li>
          <li>
            <Link to="/sell-car" className="link link-black" onClick={handleLinkClick}>
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
            <Link to="/dolar" className="link link-black" onClick={handleLinkClick}>
              Dolar
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

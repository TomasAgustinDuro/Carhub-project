import styles from "./navbar.module.scss";
import Dropdown from "../dropdown/Dropdown";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className={styles.nav}>
        <div>
          <h1><Link to="/" className="link link-black">Carhub</Link></h1>
        </div>
        <ul>
          <li>
            <Link to="/buy-car" className="link link-black">Comprá un auto</Link>
          </li>
          <li><Link to="/sell-car" className="link link-black">Vendé tu auto</Link></li>
          <li>
            <Dropdown
              initialState={"Nosotros"}
              options={[
                { label: "Preguntas frecuentes", path: "/preguntas" },
                { label: "Opiniones", path: "/reviews" },
                { label: "Historia", path: "/history" },
              ]}
            />
          </li>
          <li>
            <Link to="/dolar" className="link link-black">Dolar</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

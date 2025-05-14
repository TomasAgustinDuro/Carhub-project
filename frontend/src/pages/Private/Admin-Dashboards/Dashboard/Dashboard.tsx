import styles from "./general.module.scss";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section className={styles.sectionGeneral}>
      <header>
        <h1>Panel de Control</h1>
      </header>
      <main>
        <Link to="/admin/cars">
          <button>Agregar autos</button>
        </Link>
        <Link to="/admin/cars/delete">
          <button>Editar o eliminar auto </button>
        </Link>
        <Link to="/admin/turns">
          <button>Consultar turnos</button>
        </Link>
      </main>
    </section>
  );
}

export default Dashboard;

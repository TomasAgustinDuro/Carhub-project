import styles from "./history.module.scss";
import inaguracion from "../../../assets/inauguracion.webp";
import useGetData from "../../../hooks/useGetData";
import { FaRegStar } from "react-icons/fa6";
import Review from "../../../interfaces/Review";
import { Link } from "react-router-dom";

function History() {
  const { data } = useGetData("api/reviews");

  return (
    <section className={styles.historySection}>
      <div className={styles.title}>
        <h2>La historia de Carhub</h2>
        <h4>Innovando en la compra y venta de autos desde 1985</h4>
      </div>

      <div className={styles.historyText}>
        <h3>
          CarHub nació con una visión clara: transformar la industria automotriz
          conectando a compradores y vendedores de manera eficiente,
          transparente y segura. Desde nuestros inicios en 1985, hemos liderado
          la innovación en el mercado de autos usados y nuevos
        </h3>

        <img src={inaguracion} alt="Inauguración de nuestro primer local" />
      </div>

      <div className={styles.misionAndVision}>
        <div className={styles.mision}>
          <h2>Mision</h2>
          <p>
            Facilitar la compra y venta de vehículos ofreciendo la mejor
            experiencia tanto para vendedores como para compradores.
          </p>
        </div>
        <div className={styles.vision}>
          <h2>Visión</h2>
          <p>
            Ser la plataforma número uno a nivel global en el comercio de
            vehículos, reconocida por nuestra confianza, transparencia y
            excelencia en servicio
          </p>
        </div>
      </div>

      <div className={styles.values}>
        <div className={`${styles.cardValue} ${styles.zoom}`}>
          <img
            src="https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <h2>Innovación</h2>
          <p>Siempre estamos a la vanguardia de la tecnología automotriz.</p>
        </div>
        <div className={`${styles.cardValue} ${styles.zoom}`}>
          <img
            src="https://plus.unsplash.com/premium_photo-1682097379771-082f70085106?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y3VzdG9tZXIlMjBoYW5kc2hha2UlMjB3aXRoJTIwY2FyJTIwZGVhbGVyfGVufDB8fDB8fHww"
            alt=""
          />
          <h2>Transparencia</h2>
          <p>
            Todos los vehículos y vendedores pasan por un riguroso proceso de
            verificación.
          </p>
        </div>
        <div className={`${styles.cardValue} ${styles.zoom}`}>
          <img
            src="https://plus.unsplash.com/premium_photo-1661679600147-e842dd2164ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFwcHklMjBjdXN0b21lciUyMHJlY2VpdmluZyUyMGNhciUyMGtleXN8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
          <h2>Servicio al Cliente</h2>
          <p>La satisfacción del cliente es nuestra prioridad número uno.</p>
        </div>
      </div>

      <div className={styles.reviews}>
       <div className={styles.containerReviews}>
       {!data ? (
          <div className={styles.loader} />
        ) : (
          data.slice(0,4).map((data: Review) => (
            <div
              key={data.id}
              className={`${styles.containerReview} ${styles.zoom}`}
            >
              <div className={styles.reviewsHeader}>
                <p>
                  {" "}
                  <FaRegStar /> <strong>{data.user_name}</strong>
                </p>

                <p>{data.date}</p>
              </div>

              <p id={styles.textReview}>"{data.review}"</p>
            </div>
          ))
        )}
       </div>
        <h3>
          Puedes pasar por nuestra sección de opiniones y ver más sobre lo que
          tienen para decir nuestros clientes
        </h3>

        <Link to="/reviews" className={styles.link}>
          Ver más
        </Link>
      </div>
    </section>
  );
}
export default History;

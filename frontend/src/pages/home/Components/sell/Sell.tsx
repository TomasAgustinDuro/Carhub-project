import autosVenta from "../../../../assets/autos-png.png";
import styles from './sell.module.scss'

function Sell() {
  return (
    <section className={styles.sectionVenta}>
      <div className={styles.texto}>
        <h1>Cambiá o vendé tu auto de manera sencilla y rápida</h1>
        <h3>
          <span>💲 </span> Cotizá tu auto en nuestra sucursal.
        </h3>
        <hr />
        <h3>
          <span>🤝 </span> Vendé tu auto sin intermediarios
        </h3>
        <hr />
        <h3>
          <span> 🔄 </span>Déjalo como forma de pago y llévate otro de nuestro
          garage
        </h3>
        <hr />
        <h3>
          <span> 💳 </span> Financia tu nuevo auto de la manera que mas te
          convenga
        </h3>
      </div>

      <img src={autosVenta} alt="" />
    </section>
  );
}
export default Sell;

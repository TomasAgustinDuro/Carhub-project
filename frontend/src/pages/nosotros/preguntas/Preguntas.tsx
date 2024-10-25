import styles from "./preguntas.module.scss";
import Questions from '../../../components/questions/Questions'
import sell from './assets/view-dark-interior-car-professional-260nw-2363528063.webp';
import informacionCompra from "./assets/informacionCompra.json";
import informacionVenta from "./assets/informacionVenta.json";

function Preguntas() {
  return (
    <>
      <section>
        <div className={styles.containerHeader}>
          <h2><span>¿Tenés dudas?</span> Nosotros te las resolvemos</h2>
          <img src={sell} alt="Foto ilustrativa" />
        </div>
      </section>

      <Questions informacionCompra={informacionCompra} informacionVenta={informacionVenta} />
    </>
  );
}

export default Preguntas;

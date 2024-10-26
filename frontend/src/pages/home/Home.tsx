import styles from "./home.module.scss";
import Recommendation from "../../components/recom/Recommendation";
import Sell from "./Components/sell/Sell";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section>
        <div className={styles.container}>
          <div className={styles.text}>
            <h2>Compra o vende tu auto</h2>
            <button className={styles.homeBtn}>
              <Link to="/buy-car" >
                Elegi tu auto
              </Link>
            </button>
          </div>
          <div className={styles.background}></div>
        </div>
      </section>

      <Recommendation title={'Recomendados'}/>
      <Sell />
    </>
  );
}

export default Home;

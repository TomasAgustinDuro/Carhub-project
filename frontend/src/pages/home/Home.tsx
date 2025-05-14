// import styles from "./home.module.scss";
import { Recommendation } from "../../components";
import Sell from "./Components/sell/Sell";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section>
        <div>
          <div>
            <h2 className="font-bold underline">Compra o vende tu auto</h2>
            <button>
              <Link to="/buy-car">Elegi tu auto</Link>
            </button>
          </div>
          <div></div>
        </div>
      </section>

      <Recommendation title={"Recomendados"} />
      <Sell />
    </>
  );
}

export default Home;

import styles from "./buyCar.module.scss";
import Auto from "../../interfaces/auto";
import CardSell from "../../components/card/Card";
import Filters from "../../components/filters/Filters";
import useConnectionDB from "../../hooks/dolar/connection_db";
import Pagination from "../../components/pagination/Pagination";
import { useState, useEffect } from "react";


function BuyCar() {
  const [value, setValue] = useState("api/cars");
  const [result, setResult] = useState(0);
  const [order, setOrder] = useState ('')

  const { data } = useConnectionDB(value);

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value)
  }

  useEffect(() => {
    if (data) {
      setResult(data.length);
    }
  }, [data]);

  const sortedData = data ?  [...data].sort((a,b) => {
    if (order === 'ascendente') {
      return a.price - b.price
    } else {
      return b.price - a.price
    }
  }) : [];

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(12);

  const maximo = !data ? "error" : data.length / porPagina;

  return (
    <div>
      <div className={styles.main}>
        <Filters onValueChange={handleValueChange} />

        <section className={styles.containerCarsOffer}>
          <div className={styles.offerActions}>
            <p>Resultados({result})</p>
            <div className={styles.order}>
              <label htmlFor="sort">Ordenar por:</label>
              <select id="sort" className={styles.select} onChange={handleOrderChange}>
                <option value="ascendente">Menor a mayor precio</option>
                <option value="descendente">Mayor a menor precio</option>
              </select>
            </div>
          </div>

          <div className={styles.containerCards}>
            {!data ? (
              <div className={styles.loader}></div>
            ) : (
              <>
                {sortedData
                  .slice(
                    (pagina - 1) * porPagina,
                    (pagina - 1) * porPagina + porPagina
                  )
                  .map((car: Auto, index: number) => (
                    <CardSell key={car.id} car={car} index={index} />
                  ))}
                {data.length === 0 && <div>No hay autos disponibles</div>}
              </>
            )}
          </div>
        </section>
      </div>
      <Pagination
        pagina={pagina}
        setPagina={setPagina}
        maximo={parseInt(maximo)}
      />
    </div>
  );
}

export default BuyCar;

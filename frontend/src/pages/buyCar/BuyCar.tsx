import styles from "./buyCar.module.scss";
import Auto from "../../interfaces/Car";
import { Card, Loader, Pagination, Filters, ErrorComponent } from "../../components/";
import { useState, useEffect } from "react";
import { createCarAndAdapter } from "../../Adapters/Car.adapter";
import { useGetData } from "../../hooks";

function BuyCar() {
  const [url, setUrl] = useState("api/cars");
  const [result, setResult] = useState(0);
  const [order, setOrder] = useState("");
  const [carsData, setCarsData] = useState<Auto[]>([]); // Estado específico para los autos

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(event.target.value);
  };

  const { value: data, loading } = useGetData(url);

  // Asigna los datos a carsData cuando están disponibles
  useEffect(() => {
    if (data) {
      setCarsData(data as Auto[]); // Asignación con el tipo Auto[]
      setResult(data.length);
    }
  }, [data]);

  const sortedData = carsData
    ? [...carsData].sort((a, b) => {
        if (order === "ascendente") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      })
    : [];

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(12);

  const maximo = carsData ? Math.ceil(carsData.length / porPagina) : 0;

  return (
    <div>
      <div className={styles.main}>
        <Filters onValueChange={handleUrlChange} />

        <section className={styles.containerCarsOffer}>
          <div className={styles.offerActions}>
            <p>Resultados({result})</p>
            <div className={styles.order}>
              <label htmlFor="sort">Ordenar por:</label>
              <select
                id="sort"
                className={styles.select}
                onChange={handleOrderChange}
              >
                <option value="ascendente">Menor a mayor precio</option>
                <option value="descendente">Mayor a menor precio</option>
              </select>
            </div>
          </div>

          <div className={styles.containerCards}>
            {loading ? (
              <Loader />
            ) : (
              <>
                {sortedData
                  .slice(
                    (pagina - 1) * porPagina,
                    (pagina - 1) * porPagina + porPagina
                  )
                  .map((car: Auto, index: number) => (
                    <Card
                      car={createCarAndAdapter(car)}
                      index={index}
                      key={car.id}
                    />
                  ))}
                {carsData.length === 0 && <ErrorComponent error={{ message: 'No hay autos disponibles' }} />}
              </>
            )}
          </div>
        </section>
      </div>
      <Pagination
        pagina={pagina}
        setPagina={setPagina}
        maximo={maximo}
      />
    </div>
  );
}

export default BuyCar;

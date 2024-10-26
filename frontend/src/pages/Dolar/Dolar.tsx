import DolarCalculator from "./Components/dolarCalculator/DolarCalculator";
import useDolar from "../../hooks/dolar/useDolar";
import styles from "./dolar.module.scss";

function DolarComponent() {
  const { dolarValue, carValue, setCarValue, inputRef } = useDolar();

  const handleClick = () => {
    if (inputRef.current) {
      const inputValue = Number(inputRef.current.value);

      if (dolarValue) {
        const carValue = inputValue / dolarValue.venta;
        setCarValue(carValue);
        inputRef.current.value = String(0);
      } else {
        console.error("El valor del dólar no está disponible."); // Manejo de error
      }
    }
  };

  return (
    <>
      <div className={styles.dolarText}>
        <h1>Informativo</h1>

        <p>
          En nuestro sistema utilizamos la cotización del dólar blue para
          reflejar el precio de los vehículos, ya que es la referencia más
          cercana al valor real de la moneda en el mercado informal. La
          cotización que mostramos se actualiza en tiempo real, basada en
          fuentes confiables del mercado paralelo. Si deseas saber el precio
          exacto de un vehículo en dólares, puedes utilizar nuestra calculadora
          ingresando el precio en pesos, y te proporcionaremos el valor
          correspondiente en dólares blue.
        </p>
      </div>

      <DolarCalculator carValue={carValue} handleClick={handleClick} inputRef={inputRef} />
    </>
  );
}

export default DolarComponent;

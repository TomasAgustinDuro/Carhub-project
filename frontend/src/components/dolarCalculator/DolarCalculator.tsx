import React from 'react';
import styles from "./dolarCalculator.module.scss";

interface DolarCalculatorProps {
  carValue: number;
  handleClick: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const DolarCalculator: React.FC<DolarCalculatorProps> = ({
  carValue, 
  handleClick, 
  inputRef
}) => {
  return (
    <div className={styles.calculatorDolar}>
      <input 
        type="number" 
        placeholder="Valor en pesos" 
        ref={inputRef} 
      />
      <button onClick={handleClick}>Convertir a dólar</button>

      <div>
        {carValue !== null && (
          <p>El valor del auto en dólares es de: USD$ {carValue.toFixed(0)}</p>
        )}
      </div>
    </div>
  );
}

export default DolarCalculator;

import { useState, useEffect, useRef } from "react";
import { getData } from "../../services/dolarBlue.service.ts";
import Dolar from "../../interfaces/DolarBlue";

const useDolar = () => {
  const [dolarValue, setDolarValue] = useState<Dolar | null>(null);
  const [carValue, setCarValue] = useState(0);
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
   const fetchDolar = async() => {
    try{
      const value = await getData();
      setDolarValue(value)
    } catch(error){
      setError('No se pudo obtener el valor del dólar')
    }
   }

    fetchDolar();
  }, []);

  return {
    dolarValue,
    carValue,
    setCarValue,
    inputRef,
    error
  };
};

export default useDolar

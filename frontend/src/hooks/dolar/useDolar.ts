import { useState, useEffect, useRef } from "react";
import { getDolar } from "../../services/dolarBlue";
import Dolar from "../../interfaces/dolarBlue";

const useDolar = () => {
  const [dolarValue, setDolarValue] = useState<Dolar | null>(null);
  const [carValue, setCarValue] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchDolar = async () => {
      const value = await getDolar();
      setDolarValue(value);
    };

    fetchDolar();
  }, []);

  return {
    dolarValue,
    carValue,
    setCarValue,
    inputRef,
  };
};

export default useDolar

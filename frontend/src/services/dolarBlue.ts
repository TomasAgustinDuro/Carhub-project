import Dolar from "../interfaces/dolarBlue";

export const getDolar = async (): Promise<Dolar | null> => {
  try {
    const response = await fetch("https://dolarapi.com/v1/dolares/blue");
    if (!response.ok) {
      throw new Error("Error al obtener el valor del dólar");
    }
    const data = await response.json();
    const dolar: Dolar = {
        compra: data.compra,
        venta: data.venta,
    }
    return dolar
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
    return null;
  }
};

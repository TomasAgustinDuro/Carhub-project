import { Turn } from "../interfaces/TurnType";

const precioFormateado = (price: number) => {
  return Number(price).toLocaleString("es-ES", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  });
};

const kilometrosFormateado = (km: number) => {
  return Number(km).toLocaleString("es-ES", {
    style: "decimal",
    minimumFractionDigits: 0,
  });
};

export const adaptTurn = (flat: any): Turn => ({
  id: flat.id,
  car: {
    brand: flat.brand,
    version: flat.version,
    model: flat.model,
    year: flat.year,
    mileage: kilometrosFormateado(flat.mileage),
    price: precioFormateado(flat.price),
    description: flat.description,
  },
  user: {
    name: flat.name,
    lastName: flat.lastName,
    email: flat.email,
    phone: flat.phone,
    day: flat.day,
    hour: flat.hour,
  },
});

import { Turn } from "../interfaces/TurnType";

export const adaptTurn = (flat: any): Turn => ({
  id: flat.id,
  car: {
    brand: flat.car.brand,
    model: flat.car.model,
    year: flat.car.year,
    mileage: flat.car.mileage,
    price: flat.car.price,
    description: flat.car.description,
  },
  user: {
    name: flat.user.name,
    lastName: flat.user.lastName,
    email: flat.user.email,
    phone: flat.user.phone,
    day: flat.user.day,
    hour: flat.user.hour,
  },
});

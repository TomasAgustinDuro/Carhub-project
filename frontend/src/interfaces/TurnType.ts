export interface Turn {
  id?: string;
  car: {
    brand: string;
    model: string;
    version: string;
    year: string;
    mileage: string;
    price: string;
    description: string;
  };
  user: {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    day: string;
    hour: string;
  };
}

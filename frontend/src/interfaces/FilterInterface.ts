export interface FiltersType {
  brand: string;
  model: string;
  year: number;
  transmission: string;
  price: number;
  fuel: string;
  tank: number;
  horsepower: number;
  mileage: number;
  doors: number;
  traction: string;
  wheelMaterial: string;
  wheelSize: number;
  abs: boolean;
  tractionControl: boolean;
  bluetooth: boolean;
  usb: boolean;
}

export interface FiltersProp {
  initialFilters?: FiltersType;
  onFilter: (filters: FiltersType) => void;
}

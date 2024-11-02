import { useState } from "react";

interface FiltersType {
  model: string;
  year: number;
  transmission: string;
  price: number;
  type_fuel: string;
  tank_capacity: number;
  horsepower: number;
  mileage: number;
  doors: number;
  drive_type: string;
  wheel_material: string;
  wheel_size: number;
  abs: boolean;
  traction_control: boolean;
  upholstery: string;
  bluetooth: boolean;
  usb: boolean;
}

interface UseFiltersProps {
  initialFilters: FiltersType;
  onValueChange: (url: string) => void; // Cambiado para aceptar un string
}

const useFilters = ({ initialFilters, onValueChange }: UseFiltersProps) => {
  const [filters, setFilters] = useState<FiltersType>(initialFilters);
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: newValue,
    }));
  };

  const handleKilometrajeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      mileage: Number(e.target.value),
    }));
  };

  const handleClean = () => {
    setFilters(initialFilters); // Limpiar con los filtros iniciales
    const urlFilter = "api/cars"; // URL base
    setUrl(urlFilter);
    onValueChange(urlFilter);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const errorMessages: string[] = [];
    const params = new URLSearchParams();

    // Agregar condiciones para cada filtro
    if (filters.model) params.append("model", filters.model);
    if (filters.year > 0 && filters.year <= new Date().getFullYear()) {
      params.append("year", filters.year.toString());
    }
    if (filters.price >= 0) {
      params.append("price", filters.price.toString());
    }
    if (filters.mileage >= 0) {
      params.append("mileage", filters.mileage.toString());
    }
    params.append("abs", String(filters.abs));
    params.append("usb", String(filters.usb));
    params.append("traction_control", String(filters.traction_control));
    params.append("bluetooth", String(filters.bluetooth));

    // Manejo de errores
    if (errorMessages.length > 0) {
      setError(errorMessages.join("\n"));
      return;
    }

    const urlFilter = `api/cars?${params.toString()}`;
    setUrl(urlFilter);
    onValueChange(urlFilter);
  };

  return {
    filters,
    url,
    error,
    handleChange,
    handleKilometrajeChange,
    handleClean,
    handleSubmit,
  };
};

export default useFilters;

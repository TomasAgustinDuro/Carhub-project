// useFilters.ts
import { useState } from "react";

interface Filters {
  model?: string;
  year?: number;
  price?: number;
  mileage?: number;
  abs?: boolean;
  usb?: boolean;
  radio?: boolean;
  traction_control?: boolean;
  bluetooth?: boolean;
  [key: string]: any;
}

interface UseFiltersProps {
  initialFilters: Filters;
  onValueChange: (url: string) => void;
}

const useFilters = ({ initialFilters, onValueChange }: UseFiltersProps) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Manejar cambios en los filtros
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: newValue,
    }));
  };

  // Manejar cambio en el kilometraje
  const handleKilometrajeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      mileage: Number(e.target.value),
    }));
  };

  // Función para limpiar filtros
  const handleClean = () => {
    const resetFilters = Object.keys(initialFilters).reduce(
      (acc, key) => ({ ...acc, [key]: "" }),
      {}
    );
    setFilters(resetFilters);
    const urlFilter = "api/cars";
    setUrl(urlFilter);
    onValueChange(urlFilter);
  };

  // Manejo del envío de filtros
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const errorMessages: string[] = [];
    const params = new URLSearchParams();

    if (filters.model) params.append("model", filters.model);

    if (filters.year) {
      if (
        isNaN(filters.year) ||
        filters.year <= 0 ||
        filters.year > new Date().getFullYear()
      ) {
        errorMessages.push("El año debe ser menor que el actual y mayor a 0");
      } else {
        params.append("year", filters.year.toString());
      }
    }

    if (filters.price) {
      if (isNaN(filters.price) || filters.price < 0) {
        errorMessages.push("El precio debe ser un número positivo.");
      } else {
        params.append("price", filters.price.toString());
      }
    }

    if (filters.mileage && filters.mileage > 0) {
      params.append("mileage", filters.mileage.toString());
    }

    if (filters.abs !== undefined) {
      params.append("abs", String(filters.abs));
    }

    if (filters.usb !== undefined) {
      params.append("usb", String(filters.usb));
    }

    if (filters.radio !== undefined) {
      params.append("radio", String(filters.radio));
    }

    if (filters.traction_control !== undefined) {
      params.append("traction_control", String(filters.traction_control));
    }

    if (filters.bluetooth !== undefined) {
      params.append("bluetooth", String(filters.bluetooth));
    }

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

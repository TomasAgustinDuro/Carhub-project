import { useState } from "react";
import { FiltersProp, FiltersType } from "../interfaces/FilterInterface";
import { normalizeFilters } from "../utils/normalizeFilters";

const initialFilters: FiltersType = {
  brand: "",
  model: "",
  year: 0,
  transmission: "",
  price: 0,
  fuel: "",
  tank: 0,
  horsepower: 0,
  mileage: 0,
  doors: 0,
  traction: "",
  wheelMaterial: "",
  wheelSize: 0,
  abs: false,
  tractionControl: false,
  bluetooth: false,
  usb: false,
};

const useFilters = ({ onFilter }: FiltersProp) => {
  const [filters, setFilters] = useState<FiltersType>(initialFilters);
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
    setFilters(initialFilters);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const errorMessages: string[] = [];

    // Manejo de errores
    if (errorMessages.length > 0) {
      setError(errorMessages.join("\n"));
      return;
    }

    const normalizedFilters = normalizeFilters(filters);

    onFilter(normalizedFilters);
  };

  return {
    filters,
    error,
    handleChange,
    handleKilometrajeChange,
    handleClean,
    handleSubmit,
  };
};

export default useFilters;

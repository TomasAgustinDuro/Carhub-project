import { useState } from "react";

const useFilters = (initialFilters, onValueChange) => {
  const [filters, setFilters] = useState(initialFilters);
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);

  // Manejar cambios en los filtros
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value;
    if (type === "checkbox") {
      newValue = checked; // Booleano correcto
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: newValue,
    }));
  };

  // Manejar cambio en el kilometraje
  const handleKilometrajeChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      mileage: e.target.value,
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const errorMessages = [];
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
        params.append("year", filters.year);
      }
    }

    if (filters.price) {
      if (isNaN(filters.price) || filters.price < 0) {
        errorMessages.push("El precio debe ser un número positivo.");
      } else {
        params.append("price", filters.price);
      }
    }

    if (filters.mileage && filters.mileage > 0) {
      params.append("mileage", filters.mileage);
    }

    if (filters.abs !== "" && typeof filters.abs === "boolean") {
      params.append("abs", filters.abs);
    }

    if (filters.usb !== "" && typeof filters.usb === "boolean") {
      params.append("usb", filters.usb);
    }

    if (filters.radio !== "" && typeof filters.radio === "boolean") {
      params.append("radio", filters.radio);
    }

    if (
      filters.traction_control !== "" &&
      typeof filters.traction_control === "boolean"
    ) {
      params.append("traction_control", filters.traction_control);
    }

    if (filters.bluetooth !== "" && typeof filters.bluetooth === "boolean") {
      params.append("bluetooth", filters.bluetooth);
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

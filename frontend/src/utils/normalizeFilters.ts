import { FiltersType } from "../interfaces/FilterInterface";

export const normalizeFilters = (filters: FiltersType): FiltersType => {
  return {
    ...filters,
    brand: filters.brand?.toLowerCase().trim(),
    model: filters.model?.toLowerCase().trim(),
    transmission: filters.transmission?.toLowerCase().trim(),
    fuel: filters.fuel?.toLowerCase().trim(),
    traction: filters.traction?.toLowerCase().trim(),
    wheelMaterial: filters.wheelMaterial?.toLowerCase().trim(),
  };
};

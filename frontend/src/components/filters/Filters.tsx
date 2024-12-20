// Filters.tsx
import styles from "./filters.module.scss";
import useFilters from "../../hooks/useFilters";

interface FiltersType {
  model: string;
  year: number; // Cambiado a number
  transmission: string;
  price: number; // Cambiado a number
  type_fuel: string;
  tank_capacity: number; // Cambiado a number
  horsepower: number; // Cambiado a number
  mileage: number; // Cambiado a number
  doors: number; // Cambiado a number
  drive_type: string;
  wheel_material: string;
  wheel_size: number; // Cambiado a number
  abs: boolean;
  traction_control: boolean;
  upholstery: string;
  bluetooth: boolean;
  usb: boolean;
}

interface FiltersProps {
  onValueChange: (url: string) => void; // Cambia FiltersType a string
}

function Filters({ onValueChange }: FiltersProps) {
  const initialFilters: FiltersType = {
    model: "",
    year: 0,
    transmission: "",
    price: 0,
    type_fuel: "",
    tank_capacity: 0,
    horsepower: 0,
    mileage: 0,
    doors: 0,
    drive_type: "",
    wheel_material: "",
    wheel_size: 0,
    abs: false,
    traction_control: false,
    upholstery: "",
    bluetooth: false,
    usb: false,
  };

  const {
    filters,
    error,
    handleChange,
    handleKilometrajeChange,
    handleClean,
    handleSubmit,
  } = useFilters({ initialFilters, onValueChange });

  return (
    <div className={styles.containerFilters}>
      <form onSubmit={handleSubmit}>
        {/* Filtro de Transmisión */}
        <details className={styles.customSelect}>
          <summary>Transmisión</summary>
          <ul className={styles.list}>
            <li>
              <label>
                <input
                  type="radio"
                  name="transmission"
                  value="Manual"
                  checked={filters.transmission === "Manual"}
                  onChange={handleChange}
                />
                Manual
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="transmission"
                  value="Automática"
                  checked={filters.transmission === "Automática"}
                  onChange={handleChange}
                />
                Automática
              </label>
            </li>
          </ul>
        </details>

        {/* Filtro de Año */}
        <details className={styles.customSelect}>
          <summary>Año</summary>
          <input
            type="number"
            name="year"
            value={filters.year || ""}
            placeholder="Ingrese el año"
            onChange={handleChange}
          />
        </details>

        {/* Filtro de Precio */}
        <details className={styles.customSelect}>
          <summary>Precio</summary>
          <input
            type="number"
            name="price"
            value={filters.price || ""}
            placeholder="Ingrese el precio máximo"
            onChange={handleChange}
          />
        </details>

        {/* Filtro de Combustible */}
        <details className={styles.customSelect}>
          <summary>Combustible</summary>
          <ul className={styles.list}>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="type_fuel"
                  value="Nafta"
                  checked={filters.type_fuel === "Nafta"}
                  onChange={handleChange}
                />
                Nafta
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="type_fuel"
                  value="Gasoil"
                  checked={filters.type_fuel === "Gasoil"}
                  onChange={handleChange}
                />
                Gasoil
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="type_fuel"
                  value="Gas"
                  checked={filters.type_fuel === "Gas"}
                  onChange={handleChange}
                />
                Gas
              </label>
            </li>
          </ul>
        </details>

        {/* Filtro de Kilometraje */}
        <details className={styles.customSelect}>
          <summary>Kilometraje</summary>
          <label htmlFor="kilometrajeSlider">
            Kilometraje: {filters.mileage}
          </label>
          <input
            type="range"
            id="kilometrajeSlider"
            min="0"
            max="500000"
            step="10000"
            value={filters.mileage}
            onChange={handleKilometrajeChange}
          />
        </details>

        {/* Filtro de Capacidad de tanque */}
        <details className={styles.customSelect}>
          <summary>Capacidad de Tanque</summary>
          <input
            type="number"
            name="tank_capacity"
            value={filters.tank_capacity || ""}
            placeholder="Capacidad en litros"
            onChange={handleChange}
          />
        </details>

        {/* Filtro de ABS */}
        <details className={styles.customSelect}>
          <summary>ABS</summary>
          <ul className={styles.list}>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="abs"
                  checked={filters.abs}
                  onChange={handleChange}
                />
                ABS
              </label>
            </li>
          </ul>
        </details>

        {/* Filtro de Control de Tracción */}
        <details className={styles.customSelect}>
          <summary>Control de Tracción</summary>
          <ul className={styles.list}>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="traction_control"
                  checked={filters.traction_control}
                  onChange={handleChange}
                />
                Control de Tracción
              </label>
            </li>
          </ul>
        </details>

        {/* Filtro de Bluetooth */}
        <details className={styles.customSelect}>
          <summary>Bluetooth</summary>
          <ul className={styles.list}>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="bluetooth"
                  checked={filters.bluetooth}
                  onChange={handleChange}
                />
                Bluetooth
              </label>
            </li>
          </ul>
        </details>

        {/* Filtro de USB */}
        <details className={styles.customSelect}>
          <summary>USB</summary>
          <ul className={styles.list}>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="usb"
                  checked={filters.usb}
                  onChange={handleChange}
                />
                USB
              </label>
            </li>
          </ul>
        </details>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {/* Botones */}
        <div className={styles.buttons}>
          <button type="submit" className={styles.applyButton}>
            Aplicar Filtros
          </button>
          <button type="button" onClick={handleClean}>
            Limpiar filtros
          </button>
        </div>
      </form>
    </div>
  );
}

export default Filters;

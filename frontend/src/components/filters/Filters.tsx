
import styles from "./filters.module.scss";
import useFilters from "../../hooks/useFilters";

function Filters({ onValueChange }) {
  const initialFilters = {
    model: "",
    year: "",
    transmission: "",
    price: "",
    type_fuel: "",
    tank_capacity: "",
    horsepower: "",
    mileage: "",
    doors: "",
    drive_type: "",
    wheel_material: "",
    wheel_size: "",
    abs: "",
    traction_control: "",
    upholstery: "",
    checkbox: "",
    bluetooth: "",
    usb: "",
  };

  const {
    filters,
    error,
    handleChange,
    handleKilometrajeChange,
    handleClean,
    handleSubmit,
  } = useFilters(initialFilters, onValueChange);


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
                  type="checkbox"
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
                  type="checkbox"
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
            {" "}
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

        {/* Filtro de Cantidad de Puertas */}
        <details className={styles.customSelect}>
          <summary>Cantidad de Puertas</summary>
          <ul className={styles.list}>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="doors"
                  value="2"
                  checked={filters.doors === "2"}
                  onChange={handleChange}
                />
                2 puertas
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="doors"
                  value="4"
                  checked={filters.doors === "4"}
                  onChange={handleChange}
                />
                4 puertas
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
                  value="Sí"
                  checked={filters.bluetooth === "Sí"}
                  onChange={handleChange}
                />
                Sí
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  name="bluetooth"
                  value="No"
                  checked={filters.bluetooth === "No"}
                  onChange={handleChange}
                />
                No
              </label>
            </li>
          </ul>
        </details>

        {/* Mensaje de error en filtros */}
        {error && <div className={styles.errorMessage}>{error}</div>}

        {/* Botones */}
        <div className={styles.buttons}>
          <button type="submit" className={styles.applyButton}>
            Aplicar Filtros
          </button>

          <button
            onClick={() => {
              handleClean();
            }}
          >
            Limpiar filtros
          </button>
        </div>
      </form>
    </div>
  );
}

export default Filters;

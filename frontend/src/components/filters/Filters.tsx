// Filters.tsx
import useFilters from "../../hooks/useFilters";
import { FiltersProp } from "../../interfaces/FilterInterface";

function Filters({ onFilter }: FiltersProp) {
  const {
    filters,
    handleChange,
    handleKilometrajeChange,
    handleClean,
    handleSubmit,
    isOpen,
    toggleOpen,
  } = useFilters({ onFilter });

  return (
    <div className="lg:border-2 lg:border-gray-200 lg:bg-white lg:p-4 rounded-lg lg:shadow-md w-75">
      {/* Botón toggle solo visible en mobile */}
      <div className="md:hidden p-4 text-center">
        <button
          onClick={toggleOpen}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isOpen ? "Ocultar filtros" : "Mostrar filtros"}
        </button>
      </div>

      {/* Drawer mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden">
          <div className="fixed left-0 top-0 w-4/5 h-full bg-white shadow-md z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <button onClick={toggleOpen}>X</button>
            </div>
            {/** Acá va el mismo form que ya tenés */}
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold ">Filtros</h2>

                <p
                  className="text-blue px-4 py-2 cursor-pointer"
                  onClick={handleClean}
                >
                  Limpiar filtros
                </p>
              </div>

              <input
                type="text"
                name="brand"
                value={filters.brand || ""}
                className="p-2 border border-gray-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese la marca"
                onChange={handleChange}
              />

              <input
                type="text"
                name="model"
                className="p-2 border border-gray-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filters.model || ""}
                placeholder="Ingrese el modelo"
                onChange={handleChange}
              />

              {/* Filtro de Año */}

              <input
                type="number"
                name="year"
                value={filters.year || ""}
                className="p-2 border border-gray-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese el año"
                onChange={handleChange}
              />

              <label htmlFor="kilometraje">Kilometraje máximo</label>
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={filters.mileage}
                onChange={handleKilometrajeChange}
              />
              <input
                type="number"
                min="0"
                max="500000"
                value={filters.mileage}
                onChange={handleKilometrajeChange}
              />

              <div>
                <h3 className="font-semibold">Transmisión</h3>
                <ul className="">
                  <li>
                    <label className="flex items-center gap-2">
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
                    <label className="flex items-center gap-2">
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
              </div>

              {/* Filtro de Combustible */}
              <div>
                <h3 className="font-semibold">Combustible</h3>
                <ul className="">
                  <li>
                    <label htmlFor="fuel" className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="fuel"
                        value="Nafta"
                        checked={filters.fuel === "Nafta"}
                        onChange={handleChange}
                      />
                      Nafta
                    </label>
                  </li>
                  <li>
                    <label htmlFor="fuel" className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="fuel"
                        value="Gasoil"
                        checked={filters.fuel === "Gasoil"}
                        onChange={handleChange}
                      />
                      Gasoil
                    </label>
                  </li>
                  <li>
                    <label htmlFor="fuel" className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="fuel"
                        value="Gas"
                        checked={filters.fuel === "Gas"}
                        onChange={handleChange}
                      />
                      Gas
                    </label>
                  </li>
                  <li>
                    <label htmlFor="fuel" className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="fuel"
                        value="Diesel"
                        checked={filters.fuel === "Diesel"}
                        onChange={handleChange}
                      />
                      Diesel
                    </label>
                  </li>
                </ul>
              </div>

              <input
                type="number"
                name="tank"
                value={filters.tank || ""}
                className="p-2 border border-gray-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Capacidad en litros"
                onChange={handleChange}
              />

              <div>
                <h3 className="font-semibold">Opciones</h3>

                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="abs"
                      checked={filters.abs}
                      onChange={handleChange}
                    />
                    ABS
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="tractionControl"
                      checked={filters.tractionControl}
                      onChange={handleChange}
                    />
                    Control de Tracción
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="bluetooth"
                      checked={filters.bluetooth}
                      onChange={handleChange}
                    />
                    Bluetooth
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="usb"
                      checked={filters.usb}
                      onChange={handleChange}
                    />
                    USB
                  </label>
                </div>
              </div>

              {/* Botones */}

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 my-4"
              >
                Aplicar Filtros
              </button>
            </form>
          </div>
        </div>
      )}

      <form className="hidden lg:flex flex-col gap-2 " onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold ">Filtros</h2>

          <p
            className="text-blue px-4 py-2 cursor-pointer"
            onClick={handleClean}
          >
            Limpiar filtros
          </p>
        </div>

        <input
          type="text"
          name="brand"
          value={filters.brand || ""}
          className="p-2 border border-gray-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese la marca"
          onChange={handleChange}
        />

        <input
          type="text"
          name="model"
          className="p-2 border border-gray-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.model || ""}
          placeholder="Ingrese el modelo"
          onChange={handleChange}
        />

        {/* Filtro de Año */}

        <input
          type="number"
          name="year"
          value={filters.year || ""}
          className="p-2 border border-gray-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese el año"
          onChange={handleChange}
        />

        <label htmlFor="kilometraje">Kilometraje máximo</label>
        <input
          type="range"
          min="0"
          max="500000"
          step="10000"
          value={filters.mileage}
          onChange={handleKilometrajeChange}
        />
        <input
          type="number"
          min="0"
          max="500000"
          value={filters.mileage}
          onChange={handleKilometrajeChange}
        />

        <div>
          <h3 className="font-semibold">Transmisión</h3>
          <ul className="">
            <li>
              <label className="flex items-center gap-2">
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
              <label className="flex items-center gap-2">
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
        </div>

        {/* Filtro de Combustible */}
        <div>
          <h3 className="font-semibold">Combustible</h3>
          <ul className="">
            <li>
              <label htmlFor="fuel" className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fuel"
                  value="Nafta"
                  checked={filters.fuel === "Nafta"}
                  onChange={handleChange}
                />
                Nafta
              </label>
            </li>
            <li>
              <label htmlFor="fuel" className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fuel"
                  value="Gasoil"
                  checked={filters.fuel === "Gasoil"}
                  onChange={handleChange}
                />
                Gasoil
              </label>
            </li>
            <li>
              <label htmlFor="fuel" className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fuel"
                  value="Gas"
                  checked={filters.fuel === "Gas"}
                  onChange={handleChange}
                />
                Gas
              </label>
            </li>
            <li>
              <label htmlFor="fuel" className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fuel"
                  value="Diesel"
                  checked={filters.fuel === "Diesel"}
                  onChange={handleChange}
                />
                Diesel
              </label>
            </li>
          </ul>
        </div>

        <input
          type="number"
          name="tank"
          value={filters.tank || ""}
          className="p-2 border border-gray-300 rounded hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Capacidad en litros"
          onChange={handleChange}
        />

        <div>
          <h3 className="font-semibold">Opciones</h3>

          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="abs"
                checked={filters.abs}
                onChange={handleChange}
              />
              ABS
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="tractionControl"
                checked={filters.tractionControl}
                onChange={handleChange}
              />
              Control de Tracción
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="bluetooth"
                checked={filters.bluetooth}
                onChange={handleChange}
              />
              Bluetooth
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="usb"
                checked={filters.usb}
                onChange={handleChange}
              />
              USB
            </label>
          </div>
        </div>

        {/* {error && <div className={styles.errorMessage}>{error}</div>} */}

        {/* Botones */}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 my-4"
        >
          Aplicar Filtros
        </button>
      </form>
    </div>
  );
}

export default Filters;

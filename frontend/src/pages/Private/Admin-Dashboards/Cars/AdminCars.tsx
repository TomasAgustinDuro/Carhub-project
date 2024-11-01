import { useState, useEffect } from "react";
import styles from "./adminCars.module.scss";
import { usePostData } from "../../../../hooks";

const CarForm = () => {
  const [formData, setFormData] = useState(new FormData());
  const [submitData, setSubmitData] = useState(null);
  const { error, success } = usePostData("admin/cars", submitData);

  const handleChange = (e) => {
    const { name, type, checked, files, value } = e.target;
    if (type === "file") {
      formData.delete("images"); // Limpiar las imágenes previas
      Array.from(files).forEach((file) => {
        formData.append("images", file); // Añadir cada archivo a FormData
      });
    } else if (type === "checkbox") {
      formData.set(name, checked ? "true" : "false"); // Convertir booleano a string
    } else {
      formData.set(name, value); // Manejar otros tipos de input
    }
    setFormData(new FormData(formData)); // Actualizar el estado
  };

  useEffect(() => {
    if (success) {
      window.location.reload(); // Recargar la página si el envío fue exitoso
    }
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitData(formData);
  };

  return (
    <div className={styles.formCars}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Inserte la información del auto que desea agregar</h2>
        <div>
          <label htmlFor="model">Modelo:</label>
          <input
            type="text"
            id="model"
            name="model"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="version"> Version:</label>
          <input
            type="text"
            id="version"
            name="version"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="year">Año:</label>
          <input
            type="number"
            id="year"
            name="year"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mileage">Kilometraje:</label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="transmission">Transmisión:</label>
          <select
            id="transmission"
            name="transmission"
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Manual">Manual</option>
            <option value="Automático">Automática</option>
            <option value="Semi automático">Semi-Automática</option>
          </select>
        </div>

        <div>
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="type_fuel">Tipo de Combustible:</label>
          <select
            id="type_fuel"
            name="type_fuel"
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="nafta">Nafta</option>
            <option value="diesel">Diesel</option>
            <option value="gnc">GNC</option>
            <option value="electrico">Eléctrico</option>
            <option value="hibrido">Híbrido</option>
          </select>
        </div>
        <div>
          <label htmlFor="tank_capacity">Capacidad del Tanque:</label>
          <input
            type="number"
            id="tank_capacity"
            name="tank_capacity"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="horsepower">Caballos de Fuerza:</label>
          <input
            type="number"
            id="horsepower"
            name="horsepower"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="doors">Puertas:</label>
          <input
            type="number"
            id="doors"
            name="doors"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="drive_type">Tipo de Tracción:</label>
          <select
            id="drive_type"
            name="drive_type"
            onChange={handleChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="FWD">FWD</option>
            <option value="RWD">RWD</option>
            <option value="AWD">AWD</option>
            <option value="4WD">4WD</option>
          </select>
        </div>
        <div>
          <label htmlFor="wheel_material">Material de las Llantas:</label>
          <input
            type="text"
            id="wheel_material"
            name="wheel_material"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="wheel_size">Tamaño de las Llantas:</label>
          <input
            type="number"
            id="wheel_size"
            name="wheel_size"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>ABS:</label>
          <select name="abs" onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label>Control de Tracción:</label>
          <select name="traction_control" onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label>Tapicería:</label>
          <input type="text" name="upholstery" onChange={handleChange} />
        </div>
        <div>
          <label>Radio:</label>
          <select name="radio" onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label>Bluetooth:</label>
          <select name="bluetooth" onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label>USB:</label>
          <select name="usb" onChange={handleChange}>
            <option value="">Seleccione</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="images">Seleccione las imágenes a cargar</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Agregar auto</button>
      </form>
      {error && <p>Error: {error.message}</p>}
      {success && <p>Auto agregado exitosamente</p>}
    </div>
  );
};

export default CarForm;

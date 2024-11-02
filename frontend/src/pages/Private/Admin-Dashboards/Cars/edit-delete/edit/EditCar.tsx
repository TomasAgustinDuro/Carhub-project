import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./edit.module.scss";
import { useGetData } from "../../../../../../hooks";
import { ErrorComponent, Loader } from "../../../../../../components";
import { editData } from "../../../../../../services/conection.service";
import { Car } from "../../../../../../interfaces";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { value: data, loading, error } = useGetData(`api/cars/${id}`);
  const [carData, setCarData] = useState<Car | null>(null);

  useEffect(() => {
    if (data) {
      setCarData(data as unknown as Car);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (!carData) {
    return <div>No se encontraron datos.</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    const newValue =
      value === "true" ? true : value === "false" ? false : value;

    setCarData((prevData) => ({ ...prevData!, [name]: newValue })); // Asegúrate de que prevData no sea null
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(carData);
    editData(`admin/cars/${id}`, carData)
      .then(() => navigate("/admin/cars/delete"))
      .catch((error) => console.error("Error editando auto:", error));
  };

  return (
    <div className={styles.editCar}>
      <h1>Editar Auto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Modelo:</label>
          <input
            type="text"
            name="model"
            value={carData.model || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Versión:</label>
          <input
            type="text"
            name="version"
            value={carData.version || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Año:</label>
          <input
            type="number"
            name="year"
            value={carData.year || ""}
            onChange={handleChange}
          />
        </div>
        {/* Agrega los otros campos de la misma manera */}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditCar;

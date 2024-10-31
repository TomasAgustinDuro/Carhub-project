import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './edit.module.scss'; // Asegúrate de que el nombre del archivo sea correcto
import { useGetData } from '../../../../../../hooks';
import { Loader } from '../../../../../../components';
import { editData } from '../../../../../../services/conection.service';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { value: data, loading, error } = useGetData(`api/cars/${id}`);
  console.log(data[0])
  const [carData, setCarData] = useState(data);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error al cargar los datos del coche.</div>; // Muestra un mensaje de error
  }

  if (!data) {
    return <div>No se encontraron datos.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editData(`admin/cars/${id}`, carData)
      .then(response => navigate('/admin/cars/delete'))
      .catch(error => console.error('Error editando auto:', error));
  };

  return (
    <div className={styles.editCar}>
      <h1>Editar Auto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Modelo:</label>
          <input type="text" name="model" placeholder={data[0].model } value={carData.model || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Versión:</label>
          <input type="text" name="version" placeholder={data[0].version} value={carData.version || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Año:</label>
          <input type="number" name="year" placeholder={data[0].year} value={carData.year || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Transmisión:</label>
          <input type="text" name="transmission" placeholder={data[0].transmission} value={carData.transmission || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" name="price" placeholder={data[0].price} value={carData.price || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Combustible:</label>
          <select name="type_fuel" value={carData.type_fuel || ''} onChange={handleChange}>
            <option value="nafta">Nafta</option>
            <option value="diesel">Diesel</option>
            <option value="GNC">GNC</option>
            <option value="Eléctrico">Eléctrico</option>
            <option value="Híbrido">Híbrido</option>
          </select>
        </div>
        <div>
          <label>Capacidad del Tanque:</label>
          <input type="number" name="tank_capacity" placeholder={data[0].tank_capacity} value={carData.tank_capacity || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Caballos de Fuerza:</label>
          <input type="number" name="horsepower" placeholder={data[0].horsepower} value={carData.horsepower || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Kilometraje:</label>
          <input type="number" name="mileage" placeholder={data[0].mileage} value={carData.mileage || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Puertas:</label>
          <input type="number" name="doors" placeholder={data[0].doors} value={carData.doors || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Tipo de Tracción:</label>
          <select name="drive_type" value={carData.drive_type || ''} onChange={handleChange}>
            <option value="FWD">FWD</option>
            <option value="RWD">RWD</option>
            <option value="AWD">AWD</option>
            <option value="4WD">4WD</option>
          </select>
        </div>
        <div>
          <label>Material de las Ruedas:</label>
          <input type="text" name="wheel_material" placeholder={data[0].wheel_material} value={carData.wheel_material || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Tamaño de las Ruedas:</label>
          <input type="number" name="wheel_size" placeholder={data[0].wheel_size} value={carData.wheel_size || ''} onChange={handleChange} />
        </div>
        <div>
          <label>ABS:</label>
          <select name="abs" value={carData.abs ? 'true' : 'false'} onChange={handleChange}>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label>Control de Tracción:</label>
          <select name="traction_control" value={carData.traction_control ? 'true' : 'false'} onChange={handleChange}>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label>Tapicería:</label>
          <input type="text" name="upholstery" value={carData.upholstery || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Radio:</label>
          <select name="radio" value={carData.radio ? 'true' : 'false'} onChange={handleChange}>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label>Bluetooth:</label>
          <select name="bluetooth" value={carData.bluetooth ? 'true' : 'false'} onChange={handleChange}>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label>USB:</label>
          <select name="usb" value={carData.usb ? 'true' : 'false'} onChange={handleChange}>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditCar;

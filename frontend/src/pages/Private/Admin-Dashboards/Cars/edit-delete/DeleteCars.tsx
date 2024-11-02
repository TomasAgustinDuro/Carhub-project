import styles from "./delete.module.scss";
import { useGetData } from "../../../../../hooks";
import { Loader } from "../../../../../components";
import { deleteData } from "../../../../../services/conection.service";
import { Car } from "../../../../../interfaces";

const DeleteCars = () => {
  // Tipar el resultado de useGetData como un array de Car
  const { value: data, loading } = useGetData("api/cars");

  const carsData = data as Car[] | null; // Afirmar que data puede ser un array de Car o null

  const deleteCar = async (id: string) => {
    try {
      await deleteData(`admin/cars/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error eliminando auto:", error);
    }
  };

  return (
    <div className={styles.deleteContainer}>
      <h1>Administrar Autos</h1>
      {loading ? (
        <Loader />
      ) : (
        <ul className={styles.carList}>
          {carsData ? carsData.map((car) => (
            <li key={car.id} className={styles.carCard}>
              <h3 className={styles.carTitle}>
                {car.model} - {car.year}
              </h3>
              <div className={styles.carDetails}>
                <p className={styles.carPrice}>
                  <span>Precio: </span>${car.price}
                </p>
                <p className={styles.carMileage}>
                  <span>Kilometraje: </span>{car.mileage} km
                </p>
              </div>
              <div className={styles.carButtons}>
                <button className={styles.deleteButton} onClick={() => deleteCar(car.id)}>Eliminar</button>
                <button className={styles.editButton} onClick={() => window.location.href = `/admin/cars/edit/${car.id}`}>Editar</button>
              </div>
            </li>
          )) : <div className={styles.error}>
          <p>No hay autos disponibles.</p> 
       </div>} 
          
        </ul>
      )}
    </div>
  );
};

export default DeleteCars;

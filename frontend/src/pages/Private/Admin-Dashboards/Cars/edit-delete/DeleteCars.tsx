import styles from "./delete.module.scss";
import { useGetData } from "../../../../../hooks";
import { Loader } from "../../../../../components";
import { deleteData } from "../../../../../services/conection.service";

const DeleteCars = () => {
  const { value: data, loading } = useGetData("api/cars");

  const deleteCar = async (id) => {
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
          {data.map((car) => (
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
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteCars;

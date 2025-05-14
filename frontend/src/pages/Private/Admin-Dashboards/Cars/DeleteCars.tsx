import styles from "./delete.module.scss";
import { Car } from "../../../../interfaces/CarInterface";
import {
  useDeleteCars,
  useGetCars,
} from "../../../../services/conection.service";
import { useState } from "react";

const DeleteCars = () => {
  const { data } = useGetCars();
  const { mutate } = useDeleteCars();
  const [errors, setErrors] = useState<string[]>([]);

  const handleDeleteCar = async (id: string) => {
    console.log("ID del auto a eliminar:", id);

    try {
      mutate(id, {
        onError: (error: any) => {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Error inesperado";

          setErrors([message]);
        },
        onSuccess: () => {
          setErrors([]);
          window.location.reload();
        },
      });
    } catch (error) {
      console.error("Error agregando auto:", error);
    }
  };

  return (
    <div className={styles.deleteContainer}>
      <h1>Administrar Autos</h1>

      <ul className={styles.carList}>
        {data ? (
          data.map((car: Car) => (
            <li key={car.id} className={styles.carCard}>
              <h3 className={styles.carTitle}>
                {car.brand} - {car.year}
              </h3>
              <div className={styles.carDetails}>
                <p className={styles.carPrice}>
                  <span>Precio: </span>${car.price}
                </p>
                <p className={styles.carMileage}>
                  <span>Kilometraje: </span>
                  {car.mileage} km
                </p>
              </div>
              <div className={styles.carButtons}>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => handleDeleteCar(car.id)}
                >
                  Eliminar
                </button>
                <button
                  className={styles.editButton}
                  onClick={() =>
                    (window.location.href = `/admin/cars/edit/${car.id}`)
                  }
                >
                  Editar
                </button>
              </div>
            </li>
          ))
        ) : (
          <div className={styles.error}>
            <p>No hay autos disponibles.</p>
          </div>
        )}
      </ul>

      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteCars;

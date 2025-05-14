import { adaptTurn } from "../../../../Adapters/Turn.adapter";
import { Turn } from "../../../../interfaces/TurnType";
import {
  useGetTurns,
  useDeleteTurn,
} from "../../../../services/conection.service";
import styles from "./adminTurns.module.scss";

function Turns() {
  const { data } = useGetTurns();
  const { mutate } = useDeleteTurn();

  // Function to adapt the data from the API to the format we need
  const adaptedData: Turn[] = data?.map((turn: any) => adaptTurn(turn));

  // Function to handle the deletion of a turn
  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <section className={styles.sectionTurnsAdmin}>
      {adaptedData
        ? adaptedData.map((turn: Turn, index: number) => (
            <div key={index} className={styles.containerTurns}>
              <div className={styles.turnsInfo}>
                <p>Nombre: {turn.user.name}</p>
                <p>Apellido: {turn.user.lastName}</p>
                <p>Fecha: {turn.user.day}</p>
                <p>Hora: {turn.user.hour}</p>
              </div>
              <div className={styles.turnsButtons}>
                <button
                  className={styles.button}
                  onClick={() => handleDelete(turn.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        : "No hay turnos"}
    </section>
  );
}

export default Turns;

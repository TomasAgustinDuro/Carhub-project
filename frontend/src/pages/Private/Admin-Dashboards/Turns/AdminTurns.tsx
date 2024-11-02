import { ErrorComponent, Loader } from "../../../../components";
import { useGetData } from "../../../../hooks";
import { Turno } from "../../../../interfaces";
import styles from "./adminTurns.module.scss";

function AdminTurns() {
  const { value, loading, error } = useGetData("api/sellcar/turns");
  
  // Asumimos que value es de tipo any y lo convertimos a Turno[]
  const turns: Turno[] = Array.isArray(value) ? value : [];

  return (
    <section className={styles.sectionTurnsAdmin}>
      {loading ? (
        <Loader />
      ) : (
        turns.map((turn, index) => (
          <div key={index} className={styles.containerTurns}>
            <div className={styles.names}>
              <p>
                <strong>Nombre:</strong>
              </p>
              <p>
                {turn.nombre} {turn.apellido}
              </p>
            </div>

            <div className={styles.date}>
              <p>
                <strong>Turno: </strong>
              </p>
              <p>
                {turn.horario} | {turn.dia}
              </p>
            </div>

            <div className={styles.contact}>
              <p>
                <strong>Contacto: </strong>
              </p>
              <p>{turn.email}</p>
              <p>{turn.telefono}</p>
            </div>

            <div>
              <p>
                {turn.mensaje_adicional
                  ? turn.mensaje_adicional
                  : "No envió mensaje"}
              </p>
            </div>
          </div>
        ))
      )}

      {error && <ErrorComponent error={error} />}
    </section>
  );
}

export default AdminTurns;

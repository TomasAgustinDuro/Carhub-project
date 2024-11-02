import { useState} from "react";
import styles from "./sellCar.module.scss";
import { Turno } from "../../interfaces";
import { usePostData } from "../../hooks";
import { ErrorComponent, SuccessMessage } from "../../components";

function SellCar() {
  const [formData, setFormData] = useState<Turno>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dia: "",
    horario: "",
    mensaje_adicional: "",
  });

  const [submitData, setSubmitData] = useState<Turno | null>(null);
  const { error, success } = usePostData("api/sellcar/turns", submitData);

  // Manejador de cambios para los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejador de envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const { nombre, apellido, email, telefono, dia, horario } = formData;

  // Verificamos que todos los campos requeridos tengan valor
  if (nombre && apellido && email && telefono && dia && horario) {
    // Actualizamos submitData directamente
    setSubmitData((prev) => ({
      ...prev, // Mantenemos los datos anteriores
      ...formData, // Agregamos los nuevos datos del formulario
      id: Date.now(), // Añadimos un nuevo id
    }));

    // Llamamos a usePostData con el nuevo submitData
    const { error, success } = usePostData("api/sellcar/turns", {
      ...formData,
      id: Date.now(),
    });
    if (error) {
      console.error("Error al enviar datos:", error);
    }
    if (success) {
      console.log("Datos enviados con éxito:", success);
    }

    // Reiniciamos formData
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      dia: "",
      horario: "",
      mensaje_adicional: "",
    });
  } else {
    console.error("Faltan campos requeridos");
  }
};


  return (
    <section className={styles.sellCarSection}>
      <h2>
        ¿Querés vender tu auto? ¡Acercate a nuestra sucursal! Nuestros expertos
        lo evaluarán y te haremos una oferta atractiva.
      </h2>
      <p>¡Agenda tu turno aquí abajo!</p>

      <div className={styles.formTurn}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Dirección de Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="dia">Día:</label>
            <input
              type="date"
              id="dia"
              name="dia"
              value={formData.dia}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="horario">Horario:</label>
            <input
              type="time"
              id="horario"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="mensaje_adicional">Mensaje adicional:</label>
            <textarea
              id="mensaje_adicional"
              name="mensaje_adicional"
              value={formData.mensaje_adicional}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Solicitar Turno</button>
        </form>

        {error && <ErrorComponent error={error} />}
        {success && <SuccessMessage success={success} />}
      </div>
    </section>
  );
}

export default SellCar;

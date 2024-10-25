import { useState } from "react";
import styles from "./sellCar.module.scss";
import FormTurn from "../../interfaces/formTurn";
import usePostDB from "../../hooks/usePostDB";

function SellCar() {
  const [formData, setFormData] = useState<FormTurn>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dia: "",
    horario: "",
    mensaje_adicional: "",
  });

  const [submitData, setSubmitData] = useState<FormTurn | null>(null);
  const { error, success } = usePostDB("api/sellcar/turns", submitData);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.nombre &&
      formData.apellido &&
      formData.email &&
      formData.telefono &&
      formData.dia &&
      formData.horario
    ) {
      const newTurno = {
        id: Date.now(),
        ...formData,
      };

      setSubmitData(newTurno);
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        dia: "",
        horario: "",
        mensaje_adicional: "",
      });
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
          {/* Campos del formulario */}
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

        {error && (
          <div
            className={styles.errors}
          >
            <p >
              {error.errors
                ? error.errors.map((err, index) => (
                    <span key={index}>
                      {err.message}
                      <br />
                    </span>
                  ))
                : error.message || "Ha ocurrido un error."}
            </p>
          </div>
        )}

        {success && (
          <div className={styles.success}
          >
            <p>
              {typeof success === "object" ? (
                success.message || "¡Operación exitosa!" // Ajusta según la estructura de tu respuesta
              ) : (
                <span>{success}</span> // Si por alguna razón es un string
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SellCar;

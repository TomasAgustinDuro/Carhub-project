import { useState } from "react";
import styles from "./sellCar.module.scss";
import { Turn } from "../../interfaces/TurnType";
import { useReserveTurn } from "../../services/conection.service";
import { turnSchema } from "../../../../shared/Turn.schema";
import { parseZodErrors } from "../../utils/errors";

function SellCar() {
  // We create the state step to manage the steps of the form
  const [step, setStep] = useState(1);

  // We create the state to manage the errors
  const [errors, setErrors] = useState<string[]>([]);

  // We create the state for the form data
  const [formData, setFormData] = useState<Turn>({
    car: {
      brand: "",
      model: "",
      year: "",
      mileage: "",
      price: "",
      description: "",
    },
    user: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      day: "",
      hour: "",
    },
  });

  // We obtain the mutation function from the custom hook
  const { mutate } = useReserveTurn();

  // We create the function to handle the change of the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    const [section, field] = name.split(".");

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };
  // We create the function to handle the submit of the form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = turnSchema.safeParse(formData);

    if (!validation.success) {
      // This has to be save to show after
      const error = parseZodErrors(validation.error);
      setErrors(error);
      return;
    }

    // We verify all fields
    if (formData) {
      console.log("Form data:", formData);
      mutate(formData, {
        onError: (error: any) => {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Error inesperado";

          setErrors([message]);
        },
        onSuccess: () => {
          setErrors([]); // Limpiar errores si todo salió bien
        },
      });

      setFormData({
        car: {
          brand: "",
          model: "",
          year: "",
          mileage: "",
          price: "",
          description: "",
        },
        user: {
          name: "",
          lastName: "",
          email: "",
          phone: "",
          day: "",
          hour: "",
        },
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
          {/* Car from */}
          {step === 1 && (
            <div>
              <label htmlFor="brand">Brand:</label>
              <input
                type="text"
                id="brand"
                name="car.brand"
                value={formData.car.brand}
                onChange={handleChange}
                required
              />

              <label htmlFor="model">Model:</label>
              <input
                type="text"
                id="model"
                name="car.model"
                value={formData.car.model}
                onChange={handleChange}
                required
              />

              <label htmlFor="year">Año:</label>
              <input
                type="text"
                id="year"
                name="car.year"
                value={formData.car.year}
                onChange={handleChange}
                required
              />

              <label htmlFor="mileage">Kilometraje:</label>
              <input
                type="text"
                id="mileage"
                name="car.mileage"
                value={formData.car.mileage}
                onChange={handleChange}
                required
              />

              <label htmlFor="price">Precio:</label>
              <input
                type="text"
                id="price"
                name="car.price"
                value={formData.car.price}
                onChange={handleChange}
                required
              />

              <label htmlFor="description">Mensaje adicional:</label>
              <textarea
                id="description"
                name="car.description"
                value={formData.car.description}
                onChange={handleChange}
              />

              <button type="button" onClick={() => setStep(2)}>
                Continuar
              </button>
            </div>
          )}

          {/*  */}

          {/* User form */}
          {step === 2 && (
            <div>
              <div>
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="user.name"
                  value={formData.user.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Apellido:</label>
                <input
                  type="text"
                  id="lastName"
                  name="user.lastName"
                  value={formData.user.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Dirección de Email:</label>
                <input
                  type="email"
                  id="email"
                  name="user.email"
                  value={formData.user.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Teléfono:</label>
                <input
                  type="tel"
                  id="phone"
                  name="user.phone"
                  value={formData.user.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="day">Día:</label>
                <input
                  type="date"
                  id="day"
                  name="user.day"
                  value={formData.user.day}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="hour">Horario:</label>
                <input
                  type="time"
                  id="hour"
                  name="user.hour"
                  value={formData.user.hour}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="button" onClick={() => setStep(1)}>
                Volver atras
              </button>
              <button type="submit">Solicitar Turno</button>
            </div>
          )}
        </form>
      </div>

      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default SellCar;

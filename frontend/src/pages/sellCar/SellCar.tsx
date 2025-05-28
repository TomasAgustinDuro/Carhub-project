import { useState } from "react";
import { Turn } from "../../interfaces/TurnType";
import { useReserveTurn } from "../../services/conection.service";
import { turnSchema } from "../../../../shared/Turn.schema";
import { parseZodErrors } from "../../utils/errors";
import { ErrorComponent } from "../../components";

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
      version: "",
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
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    const [section, field] = name.split(".") as ["car" | "user", string];

    setFormData((prev) => {
      const currentSection = prev[section];
      return {
        ...prev,
        [section]: {
          ...currentSection,
          [field]: value,
        },
      };
    });
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
      mutate(formData, {
        onError: (error: any) => {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Error inesperado";

          setErrors([message]);
        },
        onSuccess: () => {
          setErrors([]);
        },
      });

      setFormData({
        car: {
          brand: "",
          model: "",
          version: "",
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
    <section className="flex flex-col items-center gap-4 p-5">
      <h2 className="text-center font-semibold text-3xl">
        Vendé tu auto con Carhub
      </h2>
      <p className="text-center lg:w-2xl ">
        Completa el formulario a continuación y nuestro equipo se pondrá en
        contacto contigo para coordinar la tasación de tu vehículo.
      </p>

      <div className="flex justify-around w-full lg:w-3xl">
        <div className="text-center flex flex-col items-center ">
          <span
            className={`font-semibold flex items-center justify-center border-2 w-10 h-10 text-xl rounded-full ${
              step === 1 ? "text-blue-500 border-blue-500" : ""
            }`}
          >
            1
          </span>
          <p className={`font-semibold ${step === 1 ? "text-blue-500" : ""} `}>
            Datos del vehículo
          </p>
        </div>
        <div className="text-center flex flex-col items-center">
          <span
            className={`font-semibold flex items-center justify-center border-2 w-10 h-10 text-xl rounded-full ${
              step === 2 ? "text-blue-500 border-blue-500" : ""
            }`}
          >
            2
          </span>
          <p className={`font-semibold ${step === 2 ? "text-blue-500" : ""} `}>
            Datos del usuario
          </p>
        </div>
      </div>

      <div className="w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  gap-4 shadow-md p-4 my-5 w-full max-w-2xl mx-auto"
        >
          {/* Car from */}
          {step === 1 && (
            <div className="flex flex-col">
              <div className="grid grid-cols-2">
                <div className=" flex flex-col p-5">
                  <label htmlFor="brand">Brand:</label>
                  <input
                    type="text"
                    id="brand"
                    name="car.brand"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                    value={formData.car.brand}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className=" flex flex-col p-5">
                  <label htmlFor="model">Model:</label>
                  <input
                    type="text"
                    id="model"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                    name="car.model"
                    value={formData.car.model}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className=" flex flex-col p-5">
                  <label htmlFor="version">Version:</label>
                  <input
                    type="text"
                    id="version"
                    name="car.version"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                    value={formData.car.version}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className=" flex flex-col p-5">
                  <label htmlFor="year">Año:</label>
                  <input
                    type="text"
                    id="year"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                    name="car.year"
                    value={formData.car.year}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className=" flex flex-col p-5">
                  <label htmlFor="mileage">Kilometraje:</label>
                  <input
                    type="text"
                    id="mileage"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                    name="car.mileage"
                    value={formData.car.mileage}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className=" flex flex-col p-5">
                  <label htmlFor="price">Precio:</label>
                  <input
                    type="text"
                    id="price"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                    name="car.price"
                    value={formData.car.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col p-5">
                <label htmlFor="description">Mensaje adicional:</label>
                <textarea
                  id="description"
                  name="car.description"
                  className="border p-1 rounded border-gray-400 focus:border-blue-600"
                  value={formData.car.description}
                  onChange={handleChange}
                />
              </div>

              <button
                type="button"
                className="rounded w-1/2 lg:w-1/4 mx-auto bg-blue-400 p-3 font-semibold hover:bg-blue-500 text-white"
                onClick={() => setStep(2)}
              >
                Continuar
              </button>
            </div>
          )}

          {/* User form */}
          {step === 2 && (
            <div>
              <div className="flex flex-col">
                <div className="grid grid-cols-2">
                  <div className="flex flex-col p-5">
                    <label htmlFor="name">Nombre:</label>
                    <input
                      type="text"
                      id="name"
                      name="user.name"
                      className="border p-1 rounded border-gray-400 focus:border-blue-600"
                      value={formData.user.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col p-5">
                    <label htmlFor="lastName">Apellido:</label>
                    <input
                      type="text"
                      id="lastName"
                      name="user.lastName"
                      className="border p-1 rounded border-gray-400 focus:border-blue-600"
                      value={formData.user.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col p-5">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="user.email"
                      className="border p-1 rounded border-gray-400 focus:border-blue-600"
                      value={formData.user.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col p-5">
                    <label htmlFor="phone">Teléfono:</label>
                    <input
                      type="tel"
                      id="phone"
                      name="user.phone"
                      className="border p-1 rounded border-gray-400 focus:border-blue-600"
                      value={formData.user.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col p-5">
                    <label htmlFor="day">Día:</label>
                    <input
                      type="date"
                      id="day"
                      className="border p-1 rounded border-gray-400 focus:border-blue-600"
                      name="user.day"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.user.day}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col p-5">
                    <label htmlFor="hour">Horario:</label>
                    <input
                      type="time"
                      id="hour"
                      min="09:00"
                      max="18:00"
                      name="user.hour"
                      className="border p-1 rounded border-gray-400 focus:border-blue-600"
                      value={formData.user.hour}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-around">
                <button
                  className="rounded w-1/4 mx-auto bg-blue-400 p-3 font-semibold hover:bg-blue-500 text-white"
                  type="button"
                  onClick={() => setStep(1)}
                >
                  Volver atras
                </button>
                <button
                  className="rounded w-1/4 mx-auto bg-blue-400 p-3 font-semibold hover:bg-blue-500 text-white"
                  type="submit"
                >
                  Solicitar Turno
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {errors.length > 0 && ErrorComponent(errors)}
    </section>
  );
}

export default SellCar;

import { useState } from "react";
import { User } from "../../../interfaces/UserInterface";
import { useRegister } from "../../../services/conection.service";
import { userSchema } from "../../../../../shared/User.schema";
import { parseZodErrors } from "../../../utils/errors";

function CreateUser() {
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const { mutate } = useRegister();

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

    if (formData.username && formData.password) {
      const validation = userSchema.safeParse(formData);

      if (!validation.success) {
        const error = parseZodErrors(validation.error);
        setErrors(error);
        return;
      }

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
          setFormData({
            username: "",
            password: "",
          });
        },
      });
    }
  };
  return (
    <section className="">
      <form
        action=""
        onSubmit={handleSubmit}
        className="border border-gray-200 shadow-md mx-auto p-5 gap-5 flex flex-col w-1/2 items-center"
      >
        <h2 className="font-semibold text-center text-2xl">Create user</h2>
        <div className="w-1/2 flex items-center justify-center ">
          <label htmlFor="username" />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            className="border p-1 rounded border-gray-400 focus:border-blue-600"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="w-1/2 flex items-center justify-center ">
          <label htmlFor="password" />
          <input
            type="password"
            name="password"
            placeholder="password"
            id="password"
            className="border p-1 rounded border-gray-400 focus:border-blue-600"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex w-full justify-center my-5">
          <button
            type="submit"
            className="rounded w-1/2 lg:w-1/4 cursor-pointer bg-blue-400 text-white p-3 font-semibold hover:bg-blue-500"
          >
            Crear cuenta
          </button>
        </div>

        {errors.length > 0 && (
          <ul className="error-list">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}
      </form>
    </section>
  );
}
export default CreateUser;

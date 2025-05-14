import { useState } from "react";
import { User } from "../../../interfaces/UserInterface";
import styles from "./createUser.module.scss";
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
    <section className={styles.sectionCreate}>
      <form action="" onSubmit={handleSubmit}>
        <h2>Create new user</h2>
        <label htmlFor="username" />
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="password" />
        <input
          type="password"
          name="password"
          placeholder="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Crear cuenta</button>

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

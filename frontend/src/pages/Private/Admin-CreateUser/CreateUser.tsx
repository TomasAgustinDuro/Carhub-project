import { usePostData } from "../../../hooks";
import { Admin } from "../../../interfaces";
import { useState } from "react";
import styles from './createUser.module.scss'
import { ErrorComponent, SuccessMessage } from "../../../components";

function CreateUser() {
  const [formData, setFormData] = useState<Admin>({
    userName: "",
    password: "",
  });

  const [submitData, setSubmitData] = useState<Admin | null>(null);
  const { error, success } = usePostData("admin/user", submitData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.userName && formData.password) {
      const newAdmin = formData;

      setSubmitData(newAdmin);

      setFormData({
        userName: "",
        password: "",
      });
    }
  };
  return (
    <section className={styles.sectionCreate}>
      <form action="" onSubmit={handleSubmit}>
        <h2>Create new user</h2>
        <label htmlFor="userName" />
        <input
          type="text"
          id="userName"
          name="userName"
          placeholder="username"
          value={formData.userName}
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
      </form>
      {error && <ErrorComponent error={error} />}
      {success && <SuccessMessage success={success} /> }
    </section>
  );
}
export default CreateUser;

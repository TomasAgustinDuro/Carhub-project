import { usePostData } from "../../../hooks";
import { Admin } from "../../../interfaces";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Login() {
  const [formData, setFormData] = useState<Admin>({
    userName: "",
    password: "",
  });

  const [submitData, setSubmitData] = useState<Admin | null>(null);
  const { error, success } = usePostData("admin/user/login", submitData);
  const { login } = useAuth();
  const navigate = useNavigate(); 
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

  useEffect(() => {
    if (success) {
      login();
      navigate("/admin"); 
    }
  }, [success, login]);

  return (
    <section>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="userName" />
        <input
          type="text"
          id="userName"
          name="userName"
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

        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && (
        <>
          <p>Error: {error.message.error}</p>
        </>
      )}{" "}
      {success && <p>Inicio de sesión exitoso</p>}
    </section>
  );
}
export default Login;

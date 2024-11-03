import { useState, useRef, useEffect } from "react";
import styles from "./adminCars.module.scss";
import { usePostData } from "../../../../hooks";
import { ErrorComponent, SuccessMessage } from "../../../../components";

const CarForm = () => {
  const formRef = useRef<HTMLFormElement | null>(null); // Ref para el formulario
  const [submitData, setSubmitData] = useState<FormData | null>(null);
  const { error, success } = usePostData("admin/cars", submitData || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, type, value } = target;

    if (type === "file") {
      const files = target.files;
      if (files) {
        const formData = new FormData(formRef.current!); // Crea un nuevo FormData basado en el formulario actual
        Array.from(files).forEach((file) => formData.append("images", file));
        setSubmitData(formData);
      }
    } else if (type === "checkbox") {
      const formData = new FormData(formRef.current!);
      formData.set(name, target.checked ? "true" : "false");
      setSubmitData(formData);
    } else {
      const formData = new FormData(formRef.current!);
      formData.set(name, value);
      setSubmitData(formData);
    }
  };

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current); // Genera FormData desde el ref
      setSubmitData(formData); // Pasa el FormData como submitData
    }
  };

  return (
    <div className={styles.formCars}>
      <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Nombre:
          <input type="text" name="name" onChange={handleChange} />
        </label>
        <label>
          Marca:
          <input type="text" name="brand" onChange={handleChange} />
        </label>
        <label>
          Año:
          <input type="number" name="year" onChange={handleChange} />
        </label>
        <label>
          Precio:
          <input type="number" name="price" onChange={handleChange} />
        </label>
        <label>
          Imagen:
          <input type="file" name="images" onChange={handleChange} multiple />
        </label>
        <label>
          Disponible:
          <input type="checkbox" name="available" onChange={handleChange} />
        </label>
        <button type="submit">Agregar auto</button>
      </form>
      {error && <ErrorComponent error={error} />}
      {success && <SuccessMessage success={success} />}
    </div>
  );
};

export default CarForm;

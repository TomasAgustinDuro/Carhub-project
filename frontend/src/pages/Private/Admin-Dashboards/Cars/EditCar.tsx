import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./edit.module.scss";
import {
  useGetCarById,
  useEditCar,
  useDeleteImages,
} from "../../../../services/conection.service";
import { Car } from "../../../../interfaces/CarInterface";
import { image } from "../../../../interfaces/ImageInterface";
import { carSchema } from "../../../../../../shared/Car.schema";
import { parseZodErrors } from "../../../../utils/errors";
import { normalizeCar } from "../../../../utils/normalizeCar";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState<Car | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const { data } = useGetCarById(id);
  const { mutate: mutateImage } = useDeleteImages();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (data) {
      setCarData(data);
    }
  }, [data]);

  // Obtain all data car
  if (!id) {
    return;
  }

  // Obtain function to edit car
  const { mutate } = useEditCar();

  if (!data) {
    return <div>No se encontraron datos.</div>;
  }

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (name === "images" && files) {
      const filesArray = Array.from(files);

      setIsUploading(true);

      const urls: image[] = [];

      for (const img of filesArray) {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "images_carhub");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        urls.push({
          title: "",
          description: "",
          url: data.secure_url,
        });
      }

      setCarData((prev) => ({
        ...prev!,
        images: [...(prev?.images || []), ...urls],
      }));
      setIsUploading(false);
    } else {
      if (name === "doors") {
        const newValue = parseInt(value, 10);
        setCarData((prev) => ({
          ...prev,
          [name]: newValue,
        }));
        return;
      }

      const newValue =
        type === "number"
          ? Number(value)
          : value === "true"
          ? true
          : value === "false"
          ? false
          : value;

      setCarData((prevData) => ({ ...prevData!, [name]: newValue }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (carData) {
      const normalizedCar = normalizeCar(carData);
      const validation = carSchema.safeParse(normalizedCar);

      if (!validation.success) {
        const error = parseZodErrors(validation.error);
        setErrors(error);
        return;
      }

      mutate(normalizedCar, {
        onError: (error: any) => {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Error inesperado";

          setErrors([message]);
        },
        onSuccess: () => {
          setErrors([]);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
      });
    }

    navigate("/admin/cars");
  };

  const handleDeleteImage = (id: string) => {
    mutateImage(id);

    setCarData((prevData) => {
      const updatedImages =
        prevData?.images?.filter((img) => img.id !== id) || [];
      const updatedCar = {
        ...prevData!,
        images: updatedImages,
      };

      return updatedCar;
    });
  };

  return (
    <div className={styles.editCar}>
      <h1>Editar Auto</h1>
      {carData ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="brand">
            Brand
            <input
              name="brand"
              value={carData.brand}
              onChange={handleChange}
              placeholder="Marca"
            />
          </label>
          <label htmlFor="model">
            Model
            <input
              name="model"
              value={carData.model}
              onChange={handleChange}
              placeholder="Modelo"
            />
          </label>
          <label htmlFor="version">
            Version
            <input
              name="version"
              value={carData.version}
              onChange={handleChange}
              placeholder="Versión"
            />
          </label>
          <label htmlFor="year">
            Año{" "}
            <input
              type="number"
              name="year"
              value={carData.year}
              onChange={handleChange}
              placeholder="Año"
            />
          </label>
          <label htmlFor="transmission">
            Tranmisión
            <select
              name="transmission"
              value={carData.transmission}
              onChange={handleChange}
            >
              <option value="Manual">Manual</option>
              <option value="Automática">Automática</option>
            </select>
          </label>
          <label htmlFor="price">
            Precio{" "}
            <input
              type="number"
              name="price"
              value={carData.price}
              onChange={handleChange}
              placeholder="Precio"
            />
          </label>
          <label htmlFor="fuel">
            Combustible
            <select name="fuel" value={carData.fuel} onChange={handleChange}>
              <option value="nafta">Nafta</option>
              <option value="diesel">Diesel</option>
              <option value="gnc">GNC</option>
              <option value="electrico">Eléctrico</option>
            </select>
          </label>
          <label htmlFor="tank">
            Capacidad del tanque
            <input
              name="tank"
              value={carData.tank}
              onChange={handleChange}
              placeholder="Tanque"
            />
          </label>
          <label htmlFor="horsePower">
            Caballos de fuerza
            <input
              name="horsePower"
              value={carData.horsePower}
              onChange={handleChange}
              placeholder="HP"
            />
          </label>
          <label htmlFor="mileage">
            Kilometraje
            <input
              type="number"
              name="mileage"
              value={carData.mileage}
              onChange={handleChange}
              placeholder="Kilometraje"
            />
          </label>
          <label htmlFor="doors">
            <select name="doors" value={carData.doors} onChange={handleChange}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label htmlFor="traction">
            <select
              name="traction"
              value={carData.traction}
              onChange={handleChange}
            >
              <option value="delantera">Delantera</option>
              <option value="trasera">Trasera</option>
              <option value="integral">Integral</option>
            </select>
          </label>
          <label htmlFor="wheelMaterial">
            Material de las llantas
            <input
              name="wheelMaterial"
              value={carData.wheelMaterial}
              onChange={handleChange}
              placeholder="Material Rueda"
            />
          </label>
          <label htmlFor="wheelSize">
            Tamaño de las llantas
            <input
              name="wheelSize"
              value={carData.wheelSize}
              onChange={handleChange}
              placeholder="Tamaño Rueda"
            />
          </label>
          <label htmlFor="abs">
            ABS
            <select
              name="abs"
              value={carData.abs ? "true" : "false"}
              onChange={handleChange}
            >
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </label>
          <label htmlFor="traction">
            Control de Tracción
            <select
              name="traction"
              value={carData.traction ? "true" : "false"}
              onChange={handleChange}
            >
              <option value="true">Si</option>
              <option value="false">No</option>
            </select>
          </label>
          <div>
            <h2>Confort y tecnología</h2>
            <label htmlFor="radio">
              Radio
              <select
                name="radio"
                value={carData.radio ? "true" : "false"}
                onChange={handleChange}
              >
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </label>
            <label htmlFor="bluetooth">
              Bluetooth
              <select
                name="bluetooth"
                value={carData.bluetooth ? "true" : "false"}
                onChange={handleChange}
              >
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </label>
            <label htmlFor="usb">
              USB
              <select
                name="usb"
                value={carData.usb ? "true" : "false"}
                onChange={handleChange}
              >
                <option value="true">Si</option>
                <option value="false">No</option>
              </select>
            </label>
          </div>

          {carData.images?.map((img, index) => (
            <div key={index}>
              <button type="button" onClick={() => handleDeleteImage(img.id)}>
                Eliminar
              </button>
              <img src={img.url} alt={`imagen-${index}`} />
            </div>
          ))}

          <label htmlFor="images">
            Agregue las imagenes
            <input
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              ref={fileInputRef}
            />
          </label>

          <button type="submit" disabled={isUploading}>
            {isUploading ? "Subiendo imagenes..." : "Editar Auto"}
          </button>
        </form>
      ) : (
        "error"
      )}

      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EditCar;

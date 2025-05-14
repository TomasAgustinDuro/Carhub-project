import React, { useRef } from "react";
import { useState } from "react";
import { Car } from "../../../../interfaces/CarInterface";
import { useGetAddCar } from "../../../../services/conection.service";
import { image } from "../../../../interfaces/ImageInterface";
import { carSchema } from "../../../../../../shared/Car.schema";
import { parseZodErrors } from "../../../../utils/errors";
import { normalizeCar } from "../../../../utils/normalizeCar";

const initialData: Car = {
  id: "",
  brand: "",
  model: "",
  version: "",
  color: "",
  year: new Date().getFullYear(),
  transmission: "",
  price: 0,
  fuel: "",
  tank: "",
  horsePower: "",
  mileage: 0,
  doors: 4,
  traction: "",
  wheelMaterial: "",
  wheelSize: "",
  abs: false,
  tractionControl: false,
  radio: false,
  bluetooth: false,
  usb: false,
  images: [],
};

function AddCars() {
  const [newCar, setNewCar] = useState<Car>(initialData);
  const { mutate } = useGetAddCar();
  const imageRef = useRef<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (name === "images" && files) {
      const filesArray = Array.from(files);
      imageRef.current = filesArray;

      setIsUploading(true);
      const urls: image[] = [];

      for (const img of filesArray) {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "images_carhub");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dxdtyx8je/image/upload",
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

      setNewCar((prev) => ({
        ...prev,
        images: urls,
      }));
      setIsUploading(false);
    } else {
      if (name === "doors") {
        // Convertir el valor de 'doors' a número
        const newValue = parseInt(value, 10); // Usamos parseInt para convertir a número
        setNewCar((prev) => ({
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

      setNewCar((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedCar = normalizeCar(newCar);

    const validation = carSchema.safeParse(normalizedCar);

    if (!validation.success) {
      const error = parseZodErrors(validation.error);
      setErrors(error);
      return;
    }

    mutate(normalizedCar, {
      onError: (error: any) => {
        const message =
          error.response?.data?.message || error.message || "Error inesperado";

        setErrors([message]);
      },
      onSuccess: () => {
        setErrors([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
    });
    setNewCar(initialData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="brand">
        Brand
        <input
          name="brand"
          value={newCar.brand}
          onChange={handleChange}
          placeholder="Marca"
        />
      </label>
      <label htmlFor="model">
        Model
        <input
          name="model"
          value={newCar.model}
          onChange={handleChange}
          placeholder="Modelo"
        />
      </label>
      <label htmlFor="version">
        Version
        <input
          name="version"
          value={newCar.version}
          onChange={handleChange}
          placeholder="Versión"
        />
      </label>
      <label htmlFor="color">
        Color
        <input
          name="color"
          value={newCar.color}
          onChange={handleChange}
          placeholder="Color"
        />
      </label>
      <label htmlFor="year">
        Año{" "}
        <input
          type="number"
          name="year"
          value={newCar.year}
          onChange={handleChange}
          placeholder="Año"
        />
      </label>
      <label htmlFor="transmission">
        Tranmisión
        <select
          name="transmission"
          value={newCar.transmission}
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
          value={newCar.price}
          onChange={handleChange}
          placeholder="Precio"
        />
      </label>
      <label htmlFor="fuel">
        Combustible
        <select name="fuel" value={newCar.fuel} onChange={handleChange}>
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
          value={newCar.tank}
          onChange={handleChange}
          placeholder="Tanque"
        />
      </label>
      <label htmlFor="horsePower">
        Caballos de fuerza
        <input
          name="horsePower"
          value={newCar.horsePower}
          onChange={handleChange}
          placeholder="HP"
        />
      </label>
      <label htmlFor="mileage">
        Kilometraje
        <input
          type="number"
          name="mileage"
          value={newCar.mileage}
          onChange={handleChange}
          placeholder="Kilometraje"
        />
      </label>
      <label htmlFor="doors">
        Puertas
        <select name="doors" value={newCar.doors} onChange={handleChange}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      <label htmlFor="traction">
        Traccion
        <select name="traction" value={newCar.traction} onChange={handleChange}>
          <option value="delantera">Delantera</option>
          <option value="trasera">Trasera</option>
          <option value="integral">Integral</option>
        </select>
      </label>
      <label htmlFor="wheelMaterial">
        Material de las llantas
        <input
          name="wheelMaterial"
          value={newCar.wheelMaterial}
          onChange={handleChange}
          placeholder="Material Rueda"
        />
      </label>
      <label htmlFor="wheelSize">
        Tamaño de las llantas
        <input
          name="wheelSize"
          value={newCar.wheelSize}
          onChange={handleChange}
          placeholder="Tamaño Rueda"
        />
      </label>
      <label htmlFor="abs">
        ABS
        <select
          name="abs"
          value={newCar.abs ? "true" : "false"}
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
          value={newCar.traction ? "true" : "false"}
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
            value={newCar.radio ? "true" : "false"}
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
            value={newCar.bluetooth ? "true" : "false"}
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
            value={newCar.usb ? "true" : "false"}
            onChange={handleChange}
          >
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </label>
      </div>

      <label htmlFor="images">
        Agregue las imagenes
        <input
          type="file"
          ref={fileInputRef}
          name="images"
          multiple
          onChange={handleChange}
        />
      </label>

      <button type="submit" disabled={isUploading}>
        {isUploading ? "Subiendo imágenes..." : "Guardar"}
      </button>

      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default AddCars;

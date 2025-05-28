import React, { useRef } from "react";
import { useState } from "react";
import { Car } from "../../../../interfaces/CarInterface";
import { useAddCar } from "../../../../services/conection.service";
import { image } from "../../../../interfaces/ImageInterface";
import { carSchema } from "../../../../shared/Car.schema";
import { parseZodErrors } from "../../../../utils/errors";
import { normalizeCar } from "../../../../utils/normalizeCar";
import ErrorComponent from "../../../../components/error/ErrorComponent";

const initialData: Car = {
  id: "",
  brand: "",
  model: "",
  version: "",
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
  const { mutate } = useAddCar();
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
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUD_NAME
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

      setNewCar((prev) => ({
        ...prev,
        images: urls,
      }));
      setIsUploading(false);
    } else {
      if (name === "doors") {
        const newValue = parseInt(value, 10);
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
    <form
      onSubmit={handleSubmit}
      className="shadow-md p-5 rounded items-center my-5 gap-2 mx-auto"
    >
      {/* Información básica */}
      <div>
        <h2 className="font-semibold text-xl">Información básica</h2>

        <div className="grid grid-cols-2">
          <div className="flex flex-col p-5">
            <label htmlFor="brand">Brand</label>
            <input
              name="brand"
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
              value={newCar.brand}
              onChange={handleChange}
              placeholder="Marca"
            />
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="model">Model</label>
            <input
              name="model"
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
              value={newCar.model}
              onChange={handleChange}
              placeholder="Modelo"
            />
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="version">Version</label>
            <input
              name="version"
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
              value={newCar.version}
              onChange={handleChange}
              placeholder="Versión"
            />
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="year">Año </label>
            <input
              type="number"
              name="year"
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
              value={newCar.year}
              onChange={handleChange}
              placeholder="Año"
            />
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              name="price"
              value={newCar.price}
              onChange={handleChange}
              placeholder="Precio"
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Caracteristicas */}
      <div>
        <h2 className="font-semibold text-xl">Características</h2>

        <div className="grid grid-cols-2">
          <div className="flex flex-col p-5">
            <label htmlFor="transmission">Transmisión</label>
            <select
              name="transmission"
              value={newCar.transmission}
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
              onChange={handleChange}
            >
              <option value="Manual">Manual</option>
              <option value="Automática">Automática</option>
            </select>
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="fuel">Combustible</label>
            <select
              name="fuel"
              value={newCar.fuel}
              onChange={handleChange}
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            >
              <option value="nafta">Nafta</option>
              <option value="diesel">Diesel</option>
              <option value="gnc">GNC</option>
              <option value="electrico">Eléctrico</option>
            </select>
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="tank">Capacidad del tanque</label>
            <input
              name="tank"
              value={newCar.tank}
              onChange={handleChange}
              placeholder="Tanque"
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            />
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="horsePower">Caballos de fuerza</label>
            <input
              name="horsePower"
              value={newCar.horsePower}
              onChange={handleChange}
              placeholder="HP"
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            />
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="mileage">Kilometraje</label>
            <input
              type="number"
              name="mileage"
              value={newCar.mileage}
              onChange={handleChange}
              placeholder="Kilometraje"
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            />
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="doors">Puertas</label>
            <select
              name="doors"
              value={newCar.doors}
              onChange={handleChange}
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            >
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="traction">Tracción</label>
            <select
              name="traction"
              value={newCar.traction}
              onChange={handleChange}
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            >
              <option value="delantera">Delantera</option>
              <option value="trasera">Trasera</option>
              <option value="integral">Integral</option>
            </select>
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="wheelMaterial">Material de las llantas</label>
            <input
              name="wheelMaterial"
              value={newCar.wheelMaterial}
              onChange={handleChange}
              placeholder="Material Rueda"
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            />
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="wheelSize">Tamaño de las llantas</label>
            <input
              name="wheelSize"
              value={newCar.wheelSize}
              onChange={handleChange}
              placeholder="Tamaño Rueda"
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            />
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="abs">ABS</label>
            <select
              name="abs"
              value={newCar.abs ? "true" : "false"}
              onChange={handleChange}
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="tractionControl">Control de Tracción</label>
            <select
              name="tractionControl"
              value={newCar.tractionControl ? "true" : "false"}
              onChange={handleChange}
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tecnologia */}
      <div>
        <h2 className="font-semibold text-xl">Confort y tecnología</h2>
        <div className="grid grid-cols-2">
          <div className="flex flex-col p-5">
            <label htmlFor="radio">Radio</label>
            <select
              name="radio"
              value={newCar.radio ? "true" : "false"}
              onChange={handleChange}
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="bluetooth">Bluetooth</label>
            <select
              name="bluetooth"
              value={newCar.bluetooth ? "true" : "false"}
              onChange={handleChange}
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="flex flex-col p-5">
            <label htmlFor="usb">USB</label>
            <select
              name="usb"
              value={newCar.usb ? "true" : "false"}
              onChange={handleChange}
              className="border p-1 rounded border-gray-400 focus:border-blue-600"
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Imagenes */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-xs text-gray-500">
          Formatos aceptados: JPG, PNG. Máximo 10 fotos.
        </p>

        <label className="cursor-pointer bg-white border border-gray-300 rounded px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100 transition">
          <input
            type="file"
            ref={fileInputRef}
            name="images"
            multiple
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="flex justify-center my-5">
        <button
          type="submit"
          disabled={isUploading}
          className="rounded w-1/2 lg:w-1/4 cursor-pointer bg-blue-400 text-white p-3 font-semibold hover:bg-blue-500"
        >
          {isUploading ? "Subiendo imágenes..." : "Agregar auto"}
        </button>
      </div>
      {errors.length > 0 && ErrorComponent(errors)}
    </form>
  );
}

export default AddCars;

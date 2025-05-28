import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
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
import { IoTrashOutline } from "react-icons/io5";
import { ErrorComponent } from "../../../../components";
import { useNavigate } from "react-router-dom";

const EditCar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [carData, setCarData] = useState<Car | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const { data } = useGetCarById(id);
  const { mutate: mutateImage } = useDeleteImages();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  console.log(import.meta.env.VITE_CLOUD_NAME);

  if (!id) return null;

  useEffect(() => {
    if (data) {
      setCarData(data);
    }
  }, [data]);

  // Obtain function to edit car
  const { mutate } = useEditCar();

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

      console.log("editCar", normalizedCar);

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

          // Ahora sí, después del éxito:
          navigate("/admin/cars");
        },
      });
    }
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
    <div className="shadow-md p-5 rounded items-center my-5 gap-2 mx-auto">
      <h2 className="font-semibold text-2xl text-center mb-5">Editar Auto</h2>
      {carData ? (
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <h2 className="font-semibold text-xl">Información básica</h2>

              <div className="grid grid-cols-2">
                <div className="flex flex-col p-5">
                  <label htmlFor="brand">Brand</label>
                  <input
                    name="brand"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                    value={carData.brand}
                    onChange={handleChange}
                    placeholder="Marca"
                  />
                </div>

                <div className="flex flex-col p-5">
                  <label htmlFor="model">Model</label>
                  <input
                    name="model"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                    value={carData.model}
                    onChange={handleChange}
                    placeholder="Modelo"
                  />
                </div>

                <div className="flex flex-col p-5">
                  <label htmlFor="version">Version</label>
                  <input
                    name="version"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                    value={carData.version}
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
                    value={carData.year}
                    onChange={handleChange}
                    placeholder="Año"
                  />
                </div>

                <div className="flex flex-col p-5">
                  <label htmlFor="price">Precio</label>
                  <input
                    type="number"
                    name="price"
                    value={carData.price}
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
                    value={carData.transmission}
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
                    value={carData.fuel}
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
                    value={carData.tank}
                    onChange={handleChange}
                    placeholder="Tanque"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                  />
                </div>

                <div className="flex flex-col p-5">
                  <label htmlFor="horsePower">Caballos de fuerza</label>
                  <input
                    name="horsePower"
                    value={carData.horsePower}
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
                    value={carData.mileage}
                    onChange={handleChange}
                    placeholder="Kilometraje"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                  />
                </div>

                <div className="flex flex-col p-5">
                  <label htmlFor="doors">Puertas</label>
                  <select
                    name="doors"
                    value={carData.doors}
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
                    value={carData.traction}
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
                    value={carData.wheelMaterial}
                    onChange={handleChange}
                    placeholder="Material Rueda"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                  />
                </div>

                <div className="flex flex-col p-5">
                  <label htmlFor="wheelSize">Tamaño de las llantas</label>
                  <input
                    name="wheelSize"
                    value={carData.wheelSize}
                    onChange={handleChange}
                    placeholder="Tamaño Rueda"
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                  />
                </div>

                <div className="flex flex-col p-5">
                  <label htmlFor="abs">ABS</label>
                  <select
                    name="abs"
                    value={carData.abs ? "true" : "false"}
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
                    value={carData.tractionControl ? "true" : "false"}
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
                    value={carData.radio ? "true" : "false"}
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
                    value={carData.bluetooth ? "true" : "false"}
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
                    value={carData.usb ? "true" : "false"}
                    onChange={handleChange}
                    className="border p-1 rounded border-gray-400 focus:border-blue-600"
                  >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Imagenes ya existentes */}
          <div className="grid grid-cols-2  p-5 gap-4">
            {carData.images?.map((img, index) => (
              <div key={index} className="flex w-full gap-2">
                <button
                  type="button"
                  className="border border-gray-200 p-1 h-1/4 shadow-sm"
                  onClick={() => handleDeleteImage(img.id)}
                >
                  <IoTrashOutline className="text-red-500 text-xl" />
                </button>
                <img src={img.url} alt={`imagen-${index}`} className="w-full" />
              </div>
            ))}
          </div>

          {/* Agregar nuevas imagenes */}
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

          {/* button */}
          <div className="flex justify-center my-5">
            <button
              type="submit"
              disabled={isUploading}
              className="rounded w-1/4 cursor-pointer bg-blue-400 text-white p-3 font-semibold hover:bg-blue-500"
            >
              {isUploading ? "Subiendo imágenes..." : "Editar auto"}
            </button>
          </div>
        </form>
      ) : (
        <div className="p-5 w-full h-1/2 bg-gray-100 text-center">
          <h3>Auto no encontrado</h3>
        </div>
      )}

      {errors.length > 0 && ErrorComponent(errors)}
    </div>
  );
};

export default EditCar;

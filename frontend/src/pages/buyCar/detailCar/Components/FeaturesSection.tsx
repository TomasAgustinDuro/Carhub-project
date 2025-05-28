import { Accordion } from "../../../../components";
import { Car } from "../../../../interfaces/CarInterface";

function FeaturesSection({ data }: { data: Car }) {
  return (
    <section className="">
      <h2 className="font-bold text-2xl p-3">Características</h2>
      <div className="">
        <Accordion
          question={"General"}
          answer={[
            `Tipo de combustible: ${data.fuel}`,
            `Capacidad del tanque: ${data.tank}`,
          ]}
        />

        <Accordion
          question={"Exterior"}
          answer={[
            `Número de puertas: ${data.doors}`,
            `Aleación de llantas:${data.wheelMaterial}`,
            `Tamaño de llantas:${data.wheelSize}`,
          ]}
        />
        <Accordion
          question={"Seguridad"}
          answer={[`ABS: ${data.abs ? "Si" : "No"}`]}
        />
        <Accordion
          question={"Entretenimiento"}
          answer={[
            `Radio: ${data.radio ? "Si" : "No"}`,

            `Bluetooth: ${data.bluetooth ? "Si" : "No"}`,

            `USB: ${data.usb ? "Si" : "No"}`,
          ]}
        />
      </div>
    </section>
  );
}

export default FeaturesSection;

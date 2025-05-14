import Accordion from "../../../../../components/accordion/Accordion";
import styles from "./featuresSection.module.scss";
import { Car } from "../../../../../interfaces/CarInterface";

function FeaturesSection({ data }: { data: Car }) {
  return (
    <section
      className={styles.features}
      aria-labelledby="caracteristicas-title"
    >
      <h2 id="caracteristicas-title">Características</h2>
      <div className={styles.containerAccordion}>
        <Accordion
          question={"General"}
          answer={[`<strong>Tipo de combustible:</strong> ${data.fuel}`]}
        />

        <Accordion
          question={"Exterior"}
          answer={[
            `<strong>Número de puertas:</strong> ${data.doors}`,
            "<br>",
            `<strong>Aleación de llantas:</strong> ${data.wheelMaterial}`,
          ]}
        />
        <Accordion
          question={"Seguridad"}
          answer={[`<strong>ABS:</strong> ${data.abs}`]}
        />
        <Accordion
          question={"Entretenimiento"}
          answer={[
            `<strong>Radio:</strong> ${data.radio}`,
            "<br>",
            `<strong>Bluetooth:</strong> ${data.bluetooth}`,
            "<br>",
            `<strong>USB:</strong> ${data.usb}`,
          ]}
        />
      </div>
    </section>
  );
}

export default FeaturesSection;

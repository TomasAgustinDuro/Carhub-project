import { createCarBooleanAdapter } from "../../../../../Adapters/CarBoolean.adapter";
import Accordion from "../../../../../components/accordion/Accordion";
import styles from "./featuresSection.module.scss";

function FeaturesSection(data) {
  const dataDetail = createCarBooleanAdapter(data.data[0])

  console.log(dataDetail)

  return (
    <section
      className={styles.features}
      aria-labelledby="caracteristicas-title"
    >
      <h2 id="caracteristicas-title">Características</h2>
      <div className={styles.containerAccordion}>
        <Accordion
          question={"General"}
          answer={[`<strong>Tipo de combustible:</strong> ${dataDetail.type_fuel}`]}
        />

        <Accordion
          question={"Exterior"}
          answer={[
            `<strong>Número de puertas:</strong> ${dataDetail.doors}`,
            "<br>",
            `<strong>Aleación de llantas:</strong> ${dataDetail.wheel_material}`,
          ]}
        />
        <Accordion
          question={"Seguridad"}
          answer={[`<strong>ABS:</strong> ${dataDetail.abs}`]}
        />
        <Accordion
          question={"Interior"}
          answer={[`<strong>Tapizado:</strong> ${dataDetail.upholstery}`]}
        />
        <Accordion
          question={"Entretenimiento"}
          answer={[
            `<strong>Radio:</strong> ${dataDetail.radio}`,
            "<br>",
            `<strong>Bluetooth:</strong> ${dataDetail.bluetooth}`,
            "<br>",
            `<strong>USB:</strong> ${dataDetail.usb}`,
          ]}
        />
      </div>
    </section>
  );
}

export default FeaturesSection;

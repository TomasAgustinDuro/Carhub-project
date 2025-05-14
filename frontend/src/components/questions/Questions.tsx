import { useState } from "react";
import Accordion from "../accordion/Accordion";
import styles from "./questions.module.scss";

// Definir la interfaz para las props del componente
interface QuestionAnswer {
  pregunta: string;
  respuesta: string | string[];
}
interface SectionQuestionsProps {
  informacionCompra: QuestionAnswer[];
  informacionVenta: QuestionAnswer[];
}

const SectionQuestions: React.FC<SectionQuestionsProps> = ({
  informacionCompra,
  informacionVenta,
}) => {
  const [selectedInfo, setSelectedInfo] = useState("info1");
  const [activeButton, setActiveButton] = useState("info1");

  function handleClick(text: string): void {
    setSelectedInfo(text);
    setActiveButton(text);
  }

  return (
    <section className={styles.sectionQuestions}>
      <div className={styles.buttons}>
        <button
          onClick={() => handleClick("info1")}
          className={`${styles.btn} ${
            activeButton === "info1" ? styles.active : ""
          }`}
        >
          Compra
        </button>
        <button
          onClick={() => handleClick("info2")}
          className={`${styles.btn} ${
            activeButton === "info2" ? styles.active : ""
          }`}
        >
          Venta
        </button>
      </div>

      {selectedInfo === "info1" && (
        <div className={styles.containerQuestions}>
          {informacionCompra.map((elemento, index) => (
            <Accordion
              key={index}
              question={elemento.pregunta}
              // Verificar si la respuesta es string o array
              answer={
                Array.isArray(elemento.respuesta)
                  ? elemento.respuesta
                  : [elemento.respuesta]
              }
            />
          ))}
        </div>
      )}

      {selectedInfo === "info2" && (
        <div className={styles.containerQuestions}>
          {informacionVenta.map((elemento, index) => (
            <Accordion
              key={index}
              question={elemento.pregunta}
              answer={
                Array.isArray(elemento.respuesta)
                  ? elemento.respuesta
                  : [elemento.respuesta]
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default SectionQuestions;

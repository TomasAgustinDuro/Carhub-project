import { useState } from "react";
import Accordion from "../accordion/Accordion";

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
    <section>
      {/* Buttons to change section */}
      <div className="bg-gray-300 w-3/4 lg:w-1/2 mx-auto p-1 rounded flex gap-5 shadow-md">
        <button
          onClick={() => handleClick("info1")}
          className={`${" p-1 rounded w-1/2 !text-gray-500 cursor-pointer"} ${
            activeButton === "info1"
              ? "bg-white !text-black border-none shadow-md"
              : ""
          }`}
        >
          Compra
        </button>

        <button
          onClick={() => handleClick("info2")}
          className={`${" p-1 rounded w-1/2 !text-gray-500 cursor-pointer"} ${
            activeButton === "info2"
              ? "bg-white !text-black border-none shadow-md"
              : ""
          }`}
        >
          Venta
        </button>
      </div>

      {/* We show first section info */}
      <div className="w-3/4 lg:w-1/2 mx-auto ">
        {selectedInfo === "info1" && (
          <div className="py-5">
            {informacionCompra.map((elemento, index) => (
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

        {/* We show first section info */}
        {selectedInfo === "info2" && (
          <div className="py-5">
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
      </div>
    </section>
  );
};

export default SectionQuestions;

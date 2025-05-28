import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

function Accordion({
  question,
  answer,
}: {
  question: string;
  answer: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-1  border-gray-200 p-3 hover:bg-gray-100">
      <div
        className="flex items-center justify-between font-semibold cursor-pointer"
        onClick={toggleAccordion}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleAccordion()}
      >
        {question} <RiArrowDropDownLine />
      </div>
      {isOpen && (
        <div className="py-3 transition-all duration-300 ease-in-out">
          {answer.map((elemento, index) => (
            <div key={index} className="w-full flex flex-col justify-center">
              <p key={index}>{elemento}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Accordion;

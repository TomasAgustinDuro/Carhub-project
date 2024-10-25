import { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import styles from "./accordion.module.scss"
import AccordionProps from '../../interfaces/Accordion'

function Accordion({ question, answer }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordionItem}>
      
    <div 
      className={styles.accordionButton} 
      onClick={toggleAccordion}
      role="button" 
      tabIndex={0} 
      onKeyDown={(e) => e.key === 'Enter' && toggleAccordion()} 
    >
      {question} <RiArrowDropDownLine className={isOpen ? styles.rotateIcon : ''} />
    </div>
    {isOpen && (
      <div className={styles.accordionContent}>
        {answer.map((elemento, index) => (
         <div key={index} dangerouslySetInnerHTML={{ __html: elemento }} />
        ))}
      </div>
    )}
  </div>
  
  );
}

export default Accordion;

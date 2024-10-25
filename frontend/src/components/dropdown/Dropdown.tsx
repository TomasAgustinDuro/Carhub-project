import { useState } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from 'react-router-dom'; // Importar Link
import styles from './Dropdown.module.scss';

interface DropdownProps {
  initialState: string;
  options: { label: string; path?: string }[]; // Modificar para incluir el path opcional
}

function Dropdown({ initialState, options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialState);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (option: { label: string; path?: string }) => {
    if (option.path) {
      // Redirigir si hay un path
      setSelectedItem(option.label);
      setIsOpen(false);
      // Puedes manejar la navegación aquí o simplemente usar el Link en la renderización
    } else {
      setSelectedItem(option.label);
      setIsOpen(false);
    }
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdownButton}
        onClick={toggleDropdown}
      >
        {selectedItem} <RiArrowDropDownLine />
      </button>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(option)}
            >
              {option.path ? (
                <Link to={option.path} className="link link-black">{option.label}</Link> 
              ) : (
                option.label
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

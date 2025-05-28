import { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import styles from "./Dropdown.module.scss";

interface DropdownOption {
  label: string;
  path?: string;
}

interface DropdownProps {
  initialState: string;
  options: DropdownOption[];
  onOptionSelect: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  initialState,
  options,
  onOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialState);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleItemClick = (option: DropdownOption) => {
    if (!option.path) {
      setSelectedItem(option.label);
    }
    setIsOpen(false);
    onOptionSelect();
  };

  // Cerrar el dropdown si se clickea fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className={`${styles.dropdownButton} flex items-center gap-1 cursor-pointer focus:font-semibold focus:text-blue-500`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedItem}
        <RiArrowDropDownLine />
      </button>

      {isOpen && (
        <ul
          role="menu"
          className="absolute mt-2 bg-white rounded shadow-md z-50 flex flex-col gap-5"
        >
          {options.map((option, index) => (
            <li
              key={index}
              role="menuitem"
              onClick={() => handleItemClick(option)}
              className="hover:bg-gray-100 text-sm focus:font-semibold focus:text-blue-500"
            >
              {option.path ? (
                <Link
                  to={option.path}
                  className="block w-full px-7 py-3 h-full "
                >
                  {option.label}
                </Link>
              ) : (
                option.label
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

import React, { useState } from 'react';
import Button from './Button';

interface DropdownProps {
    options: string[];
    selected: string;
    onSelect: (selectedOption: string) => void;
    button: React.ReactNode
}

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onSelect, button }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <Button btnType="secondary" onClick={toggleDropdown}>
                {button}
            </Button>
            {isOpen && (
                <div className="absolute bg-white shadow-lg rounded-lg w-full min-w-40 z-10">
                    <ul className="py-2 text-sm text-gray-700">
                        {options.map((option, index) => (
                            <li key={index}>
                                <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => handleSelect(option)}
                                >
                                    {option}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
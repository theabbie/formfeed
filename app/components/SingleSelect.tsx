import React, { useState } from 'react';

type SingleSelectProps = {
    options: string[];
    onChange: (updatedOptions: string[]) => void;
};

export default function SingleSelect({ options: initialOptions, onChange }: SingleSelectProps) {
    const [options, setOptions] = useState<string[]>(initialOptions);
    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleBlur = () => {
        onChange(options.filter((option) => option.trim() !== ''));
    };

    return (
        <div className="flex flex-col gap-2">
            {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        onBlur={handleBlur}
                        placeholder={`Option ${index + 1}`}
                        className="border p-2 rounded w-full"
                    />
                </div>
            ))}
            <button
                onClick={handleAddOption}
                className="flex items-center justify-center gap-2 p-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
            >
                + Add Option
            </button>
        </div>
    );
}

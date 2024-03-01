"use client";

import React, { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  options: string[];
  onSelect: (selectedOption: string | null) => void;
  label: string;
};

const FilterCard = (props: Props) => {
  const { src, options, onSelect, label } = props;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block">
      <div
        className="flex items-center cursor-pointer p-2 gap-4 border-2 border-gray-400 rounded"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Image src={src} alt="" width={16} height={16} className="-mr-3" />
        {selectedOption || label}
        <Image
          src="./assets/svg/arrow-down.svg"
          alt=""
          width={16}
          height={16}
          className={showDropdown ? "transform rotate-180" : ""}
        />
      </div>

      {showDropdown && (
        <div className="absolute mt-2 p-2 bg-white border rounded shadow-md">
          {options.map((option) => (
            <div
              key={option}
              className={`cursor-pointer py-2 pr-16 pl-2 ${
                selectedOption === option ? "font-bold" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterCard;

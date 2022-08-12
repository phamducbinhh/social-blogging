import React from "react";
import { useDropdown } from "./dropdown-context";

const Select = ({ placeholder = "", className = "" }) => {
  const { handleToggleDropdown, show } = useDropdown();
  return (
    <div
      className={`flex items-center justify-between py-4 px-5 bg-[#F3F4F6] border border-grayf1 rounded-lg cursor-pointer text-sm text-[#000] ${className}`}
      onClick={handleToggleDropdown}
    >
      <span>{placeholder}</span>
      <span>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </div>
  );
};

export default Select;

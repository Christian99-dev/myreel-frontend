"use client";
import { ChangeEvent } from "react";

export default function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  const isFilled = value !== "";
  return (
    <div className="w-full">
      <label
        className={`
            bg-white 
            fs-9 
            font-normal 
            text-pink-very-light 
            transition-colors 
            duration-200
            
            peer
            ${isFilled ? "text-purple" : ""}
        `}
      >
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
            w-full 
            border-2 
            border-pink-very-light 
            rounded-main 
            fs-9 
            font-medium 
            py-[--spacing-2] 
            px-[--spacing-8] 
            placeholder-purple 
            placeholder:font-normal
            focus:outline-none
            placeholder-opacity-50 
            transition-colors 
            duration-200
            peer-focus:text-purple
            focus:border-purple
            focus:border-opacity-50

            text-purple
            ${isFilled ? "border-purple" : ""}
            ${isFilled ? "!border-opacity-100" : ""}
        `}
      />
    </div>
  );
}

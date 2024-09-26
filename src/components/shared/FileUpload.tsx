import React, { useState, DragEvent } from "react";
import Icon from "./Icon";

const FileUploadBox = ({
  label,
  accept,
  onFileSelected,
  fileName
}: {
  label: string;
  accept: string;
  fileName?: string;
  onFileSelected: (file: File) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelected(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelected(file);
    }
  };

  return (
    <div
      className={`flex flex-col text-center items-center justify-center border-[2px] border-dashed rounded-main transition-colors duration-300 w-full h-full relative ${
        isDragging || fileName
          ? "border-pink-very-light bg-pink-very-light bg-opacity-25"
          : "border-purple-light bg-purple-light bg-opacity-25"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id={`${label}-file-input`}
      />
      <label
        htmlFor={`${label}-file-input`}
        className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer"
      />
      
      <p className={`fs-10 font-medium opacity-75 mb-[--spacing-4]`}>
        {label}
      </p>
      <Icon name="upload" size={4}  color={fileName ? "pink-very-light" : "purple-light" } />
      <p className={`fs-10 mt-[--spacing-4] ${fileName ? "font-bold" : "opacity-50"} `}>
        {fileName ? fileName : "Drag & drop here, or click to select a file"}
      </p>
    </div>
  );
};

export default FileUploadBox;

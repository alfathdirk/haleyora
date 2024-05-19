// components/ui/FileUpload.tsx
"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { ImageIcon, FileIcon, FileTextIcon, Trash } from "lucide-react";

interface FileUploadProps {
  name: string;
  maxFiles?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ name, maxFiles = 5 }) => {
  const { setValue, watch, trigger } = useFormContext();
  const [files, setFiles] = useState<File[]>(watch(name) || []);

  const { isOver, setNodeRef } = useDroppable({
    id: `${name}-droppable`,
  });

  useEffect(() => {
    setValue(name, files);
  }, [files, name, setValue]);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const newFiles = Array.from(event.dataTransfer.files);
      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
      setFiles(updatedFiles);
      trigger(name);
    },
    [files, maxFiles],
  );

  const onSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    trigger(name);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    trigger(name);
  };

  const renderFilePreview = (file: File) => {
    if (file.type.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="object-cover w-20 h-20 transition-transform transform rounded-md shadow-md hover:scale-105"
        />
      );
    } else if (file.type === "application/pdf") {
      return <FileTextIcon className="w-20 h-20 text-gray-500" />;
    } else {
      return <FileIcon className="w-20 h-20 text-gray-500" />;
    }
  };

  return (
    <DndContext>
      <div
        ref={setNodeRef}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-4 border-dashed ${
          isOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
        } p-4 text-center rounded-lg transition-colors`}
      >
        <p className="mb-4 text-sm text-gray-500">
          Drag & drop some files here, or click to select files
        </p>
        <input
          name={name}
          type="file"
          multiple
          onChange={onSelectFiles}
          style={{ display: "none" }}
          id={`${name}-file-upload`}
        />
        <label
          htmlFor={`${name}-file-upload`}
          className="px-2 py-1 text-xs font-semibold text-white transition-colors bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
        >
          Select Files
        </label>
        <div>
          <ul className="flex flex-wrap items-center gap-4 mt-4">
            {files.map((file, index) => (
              <li key={index} className="flex flex-col items-center w-32">
                {renderFilePreview(file)}
                <span
                  className="w-full mt-2 text-sm truncate"
                  title={file.name}
                >
                  {file.name}
                </span>
                <button
                  onClick={() => removeFile(index)}
                  className="mt-2 text-red-400 transition-colors hover:text-red-600"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DndContext>
  );
};

export default FileUpload;

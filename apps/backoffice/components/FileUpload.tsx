"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { FileIcon, FileTextIcon, Trash } from "lucide-react";
import { fetchDirectusFile } from "@/lib/helper";

interface FileUploadProps {
  name: string;
  maxFiles?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ name, maxFiles = 5 }) => {
  const { setValue, watch, trigger } = useFormContext();
  const [files, setFiles] = useState<File[]>(watch(name) || []);
  const [backendFiles, setBackendFiles] = useState<any[]>([]);

  const { isOver, setNodeRef } = useDroppable({
    id: `${name}-droppable`,
  });

  useEffect(() => {
    setValue(name, files);
  }, [files, name, setValue]);

  useEffect(() => {
    // Fetch existing files from the backend if available
    const fetchFiles = async () => {
      const existingFiles = watch(name);
      if (existingFiles && existingFiles.length) {
        const fetchedFiles = await Promise.all(existingFiles.map(fetchDirectusFile));
        setBackendFiles(fetchedFiles);
      }
    };
    fetchFiles();
  }, [name, watch]);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const newFiles = Array.from(event.dataTransfer.files);
      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
      setFiles(updatedFiles);
      trigger(name);
    },
    [files, maxFiles, name, trigger]
  );

  const onSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
    setFiles(updatedFiles);
    trigger(name);
  };

  const removeFile = (index: number, isBackendFile: boolean) => {
    if (isBackendFile) {
      const updatedBackendFiles = backendFiles.filter((_, i) => i !== index);
      setBackendFiles(updatedBackendFiles);
    } else {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
    }
    trigger(name);
  };

  const renderFilePreview = (file: File | any, isBackendFile: boolean) => {
    if (isBackendFile) {
      if (file.type.startsWith("image/")) {
        return (
          <img
            src={file.url}
            alt={file.filename_disk}
            className="object-cover w-20 h-20 transition-transform transform rounded-md shadow-md hover:scale-105"
          />
        );
      } else if (file.type === "application/pdf") {
        return <FileTextIcon className="w-20 h-20 text-gray-500" />;
      } else {
        return <FileIcon className="w-20 h-20 text-gray-500" />;
      }
    } else {
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
            {backendFiles.map((file, index) => (
              <li key={file.id} className="flex flex-col items-center w-32">
                {renderFilePreview(file, true)}
                <span
                  className="w-full mt-2 text-sm truncate"
                  title={file.filename_disk}
                >
                  {file.filename_disk}
                </span>
                <button
                  onClick={() => removeFile(index, true)}
                  className="mt-2 text-red-400 transition-colors hover:text-red-600"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </li>
            ))}
            {files.map((file, index) => (
              <li key={index} className="flex flex-col items-center w-32">
                {renderFilePreview(file, false)}
                <span
                  className="w-full mt-2 text-sm truncate"
                  title={file.name}
                >
                  {file.name}
                </span>
                <button
                  onClick={() => removeFile(index, false)}
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

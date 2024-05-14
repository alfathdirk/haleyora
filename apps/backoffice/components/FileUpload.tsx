import React, { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { DndContext, useDroppable } from '@dnd-kit/core';

interface FileUploadProps {
  name: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ name }) => {
  const { setValue } = useFormContext();
  const [files, setFiles] = useState<File[]>([]);

  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setValue(name, [...files, ...newFiles], { shouldValidate: true });
  }, [setValue, files, name]);

  const onSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setValue(name, [...files, ...newFiles], { shouldValidate: true });
  };

  return (
    <DndContext>
      <div
        ref={setNodeRef}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-2 border-dashed ${isOver ? 'border-blue-500' : 'border-gray-300'} p-6 text-center`}
      >
        <p>Drag 'n' drop some files here, or click to select files</p>
        <input
          type="file"
          multiple
          onChange={onSelectFiles}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          Select Files
        </label>
        <div>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </DndContext>
  );
};

export default FileUpload;

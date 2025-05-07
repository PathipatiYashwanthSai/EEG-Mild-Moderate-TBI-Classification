import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUploader.css';

export default function FileUploader({ onFileSelect }) {
  const onDrop = useCallback(files => {
    onFileSelect(files[0]);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop, accept: '.xlsx', multiple: false });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      {isDragActive
        ? <p>Drop your EEG file here</p>
        : <p>Drag & drop an .xlsx file, or click to select</p>}
      {acceptedFiles.length > 0 && (
        <p className="file-info">
          Selected: {acceptedFiles[0].name}
        </p>
      )}
    </div>
  );
}

import { useState } from 'react';

import { FileUpload } from '../../../../libs/ui/file-upload';
import { File } from '../../../../libs/ui/file';

import { Example } from './example';

export const FileUploadDemo = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (files) setSelectedFiles(Array.from(files));
  };

  const handleImages = (files: FileList | null) => {
    if (files) setImageFiles(Array.from(files));
  };

  return (
    <Example
      id="file-upload-examples"
      title="File Upload"
      description="Allows users to select and upload one or more files from their device."
    >
      <Example.Case
        id="file-upload-basic"
        title="1) Basic (default slot)"
        description="Default appearance with the built-in upload icon and label."
      >
        <FileUpload aria-label="Upload a file" />
      </Example.Case>

      <Example.Case
        id="file-upload-custom-content"
        title="2) Custom content"
        description="Replace the default slot with romantic-themed messaging."
      >
        <FileUpload aria-label="Upload love letter">
          <span className="text-3xl" aria-hidden="true">
            💌
          </span>
          <span className="b2 text-center">
            Drop your love letter here,
            <br />
            or click to choose a file
          </span>
        </FileUpload>
      </Example.Case>

      <Example.Case
        id="file-upload-accept"
        title="3) Accept filter (images only)"
        description="Restricts the browser's file picker to image formats."
      >
        <div className="space-y-4">
          <FileUpload
            accept="image/*"
            multiple
            onFileSelect={handleImages}
            aria-label="Upload photos"
          >
            <span className="text-3xl" aria-hidden="true">
              📷
            </span>
            <span className="b2">Upload your couple photos (images only)</span>
            <span className="b3 opacity-60">PNG, JPG, GIF, WebP…</span>
          </FileUpload>
          {imageFiles.length > 0 && (
            <div className="space-y-2">
              {imageFiles.map((f, i) => (
                <File
                  key={i}
                  name={f.name}
                  meta={`${(f.size / 1024).toFixed(1)} KB`}
                />
              ))}
            </div>
          )}
        </div>
      </Example.Case>

      <Example.Case
        id="file-upload-multiple"
        title="4) Multiple files + file list"
        description="Allow multi-file selection and display each picked file."
      >
        <div className="space-y-4">
          <FileUpload
            multiple
            onFileSelect={handleFiles}
            aria-label="Upload multiple files"
          />
          {selectedFiles.length > 0 ? (
            <div className="space-y-2">
              {selectedFiles.map((f, i) => (
                <File
                  key={i}
                  name={f.name}
                  meta={`${(f.size / 1024).toFixed(1)} KB · ${f.type || 'unknown type'}`}
                />
              ))}
            </div>
          ) : (
            <p className="b3 text-center opacity-60">No files selected yet.</p>
          )}
        </div>
      </Example.Case>

      <Example.Case
        id="file-upload-disabled"
        title="5) Disabled"
        description="Non-interactive state – upload is locked for this example."
      >
        <FileUpload disabled aria-label="Upload disabled">
          <span className="b2">Upload temporarily unavailable</span>
        </FileUpload>
      </Example.Case>
    </Example>
  );
};

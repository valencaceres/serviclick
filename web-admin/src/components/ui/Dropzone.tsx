import { useDropzone } from "react-dropzone";
import React, { useEffect } from "react";
import Image from "next/image";

import { generateClientDropzoneAccept } from "uploadthing/client";

interface CustomFile extends File {
  preview: string;
}

export function DropZone({
  files,
  setFiles,
}: {
  files: CustomFile[];
  setFiles: (value: CustomFile[]) => void;
}) {
  const fileTypes = ["image/jpeg", "image/png"];

  const { getRootProps, getInputProps } = useDropzone({
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    onDrop: (acceptedFiles) => {
      const updatedFiles: CustomFile[] = acceptedFiles.map(
        (file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }) as CustomFile
      );
      setFiles(updatedFiles);
    },
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div {...getRootProps()} className="relative">
      <input {...getInputProps()} />
      <div className="  flex cursor-pointer flex-col items-center justify-center  border  pb-6 pt-5">
        <svg
          className="mb-3 h-10 w-10 text-primary-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p className="mb-2 text-sm text-primary-500">
          <span className="font-semibold">Click para subir</span> o arrastrar y
          soltar
        </p>
        <p className="text-xs  text-primary-500">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </div>
      <div>
        {files.map((file) => (
          <div key={file.name}>
            <Image
              fill
              src={file.preview}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
              alt={file.name}
              className="rounded-md  object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

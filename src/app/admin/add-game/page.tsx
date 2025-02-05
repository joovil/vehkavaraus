"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import FileUpload from "./FileUpload";

type UploadStatus = "idle" | "uploading" | "success" | "error";

const AddGame = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");

  return (
    <div className="box-basic">
      <h2>{name || "New game"}</h2>

      <div className="flex gap-4">
        <ImagePreview file={file} />

        <form className="flex flex-col justify-between">
          <div className="mb-2 flex flex-col">
            <label>Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name of game"
              type="text"
            />
          </div>

          <FileUpload
            file={file}
            setFile={setFile}
          />
        </form>
        <div className="flex flex-col [&>span]:inline-block">
          <h3 className="m-0">File info</h3>
          {file && (
            <>
              <span>Size</span>
              <span>{file.name}</span>
              <span>Name</span>
              <span>{(file.size / Math.pow(1024, 2)).toFixed(2)} MB</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ImagePreview = ({ file }: { file: File | null }) => {
  const [imgUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    console.log("File updated");
    setImageUrl(URL.createObjectURL(file) as string);
  }, [file]);

  return (
    <div className="relative h-80 w-80">
      {file && imgUrl ? (
        <Image
          src={imgUrl}
          alt="Image of new game"
          fill
          unoptimized
        />
      ) : (
        <div className="mt-auto flex h-full w-full items-center justify-center bg-inputGreenV">
          <span className="text-2xl">Image preview</span>
        </div>
      )}
    </div>
  );
};

export default AddGame;

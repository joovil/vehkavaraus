"use client";

import { useRef } from "react";

export default function FileUpload({
  setFile,
}: {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    console.log(inputRef.current!.click());
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div
        className="flex flex-1 items-center justify-center border-2 border-dashed border-lightGrayV bg-inputGreenV"
        onDrop={onDropHandler}
        onDragOver={onDropHandler}
      >
        <input
          className="hidden"
          type="file"
          ref={inputRef}
        />
        <span>Drop image here</span>
      </div>

      <button
        className="btn-primary mt-2"
        onClick={handleClick}
        type="button"
      >
        Select image
      </button>
    </div>
  );
}

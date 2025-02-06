"use client";

import Compressor from "compressorjs";
import { useEffect, useRef, useState } from "react";
import { ImagePreview } from "./ImagePreview";

const AddGame = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressed, setCompressed] = useState<File | null>(null);
  const [name, setName] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;

    new Compressor(file, {
      quality: 0.5,
      success(res) {
        setCompressed(new File([res], "test"));
      },
    });
  }, [file]);

  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
      console.log(file);
    }
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file && !compressed) return;

    console.log(name);
    // const res = await createGameService();
  };

  return (
    <div className="box-basic">
      <h2>{name || "New game"}</h2>

      <div className="sm:grid sm:grid-cols-2 sm:gap-2 lg:flex lg:gap-4 lg:[&>*]:flex-1">
        <ImagePreview file={file} />

        <form
          className="flex flex-col justify-between sm:order-last sm:col-span-2"
          onSubmit={handleSubmit}
        >
          {/* Name input and buttons */}
          <div className="gap-2 lg:flex lg:h-full lg:flex-col">
            {/* Name input */}
            <div>
              <label className="text-xl font-bold">Name</label>
              <input
                className="w-full"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Game name"
                type="text"
              />
            </div>

            {/* Button div */}
            <div className="my-2 flex flex-col gap-2 sm:mb-0 lg:order-last lg:m-0 lg:flex-col [&>button]:w-full">
              <button
                className="btn-primary"
                onClick={handleClick}
                type="button"
              >
                Select image
              </button>
              <button
                className="btn-primary"
                disabled={!(file && name)}
              >
                Add game
              </button>
            </div>

            {/* Image Drop */}
            <div className="hidden lg:block lg:h-full">
              <div
                className="flex h-full flex-1 items-center justify-center border-2 border-dashed border-lightGrayV bg-inputGreenV"
                onDrop={onDropHandler}
                onDragOver={onDropHandler}
              >
                <input
                  className="hidden"
                  type="file"
                  ref={inputRef}
                  onChange={handleFileChange}
                />
                <span>Drop image here</span>
              </div>
            </div>
          </div>
        </form>

        {/* Image info */}
        <div className="flex-col lg:order-last">
          <h3 className="m-0">File info</h3>
          {file && (
            <div className="flex flex-col">
              <span>Size</span>
              <span>{file.name}</span>
              <span>Name</span>
              <span>{(file.size / 1024 ** 2).toFixed(2)} MB</span>
              <span>Compressed size:</span>
              <span>
                {compressed
                  ? `${(compressed.size / 1024 ** 2).toFixed(2)} MB`
                  : "-"}
              </span>
            </div>
          )}

          {/* Missing field errors */}
          <div className="flex flex-col">
            {!name && <span>Name missing</span>}
            {!file && <span>Image missing</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGame;

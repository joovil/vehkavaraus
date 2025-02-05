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
    console.log(inputRef.current!.click());
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

      <div className="flex gap-4">
        <ImagePreview file={file} />

        <form
          className="flex flex-col justify-between"
          onSubmit={handleSubmit}
        >
          <div className="mb-2 flex flex-col">
            {/* Name input */}
            <label>Name</label>
            <input
              className=""
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name of game"
              type="text"
            />
          </div>

          {/* Image input */}
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

            <div>
              <button
                className="btn-primary mr-2 mt-2"
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
          </div>
        </form>

        {/* Image info */}
        <div className="flex flex-col [&>span]:inline-block">
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
          <div className="mt-auto flex flex-col">
            {!name && <span className="">Name missing</span>}
            {!file && <span>Image missing</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGame;

"use client";

import { useDisplayMessage } from "@/components/useDisplayMessage";
import { createGameService } from "@/lib/services/games/createGameService";
import { AdminGame } from "@/types";
import Compressor from "compressorjs";
import { useEffect, useRef, useState } from "react";
import { ImagePreview } from "./ImagePreview";

const AddGame = ({
  setGames,
}: {
  setGames?: React.Dispatch<React.SetStateAction<AdminGame[]>>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [compressed, setCompressed] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const [setMessage, message] = useDisplayMessage();
  const [setErrorMessage, errorMessage] = useDisplayMessage();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;

    new Compressor(file, {
      quality: 0.5,
      success(res) {
        setCompressed(new File([res], name));
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
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
    setDisabled(true);
    if (!file || !compressed) return;

    try {
      const createdGame = await createGameService(name, file);
      const gameToList: AdminGame = {
        borrowStatus: createdGame.borrowStatus,
        gameId: createdGame.id,
        gameName: createdGame.name,
        imageUrl: createdGame.imageUrl,
      };

      setName("");
      setFile(null);
      setMessage("Game added successfully");
      setDisabled(false);

      if (setGames) {
        setGames((prev) => [...prev, gameToList]);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      console.error("Error creating game:", error);
    }
    setDisabled(false);
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
                disabled={!(file && name) || disabled}
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

        {/* File info */}
        <div className="flex-col lg:order-last">
          <h3 className="m-0">File info</h3>

          <span className="text-xl text-green-800">{message}</span>
          <span className="text-xl text-red-800">{errorMessage}</span>
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
            <span className="text-lg sm:text-xl">Image should be square</span>
            {!name && <span>Name missing</span>}
            {!file && <span>Image missing</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGame;

"use client";

import { Game } from "@/types/game";
import Image from "next/image";
import { useState } from "react";

const GameCard = ({ game }: { game: Game }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="w-[300px] h-[300px] relative">
        {game.image && (
          <Image
            src={game.image}
            alt="Picture of a board game"
            fill
            className="object-cover"
          />
        )}

        {visible && (
          <div className="">
            <form className="absolute bottom-0 bg-offWhiteV flex flex-col p-3 gap-3 m-2 shadow-primary">
              <label className="font-bold text-xl text-center">Apartment</label>
              <input
                className="w-3/4 m-auto"
                type="text"
                placeholder="apartment"
              />
              <div className="flex gap-3">
                <button className="btn-primary">Submit</button>
                <button className="btn-primary">Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>

      <span className="font-bold text-2xl my-2">{game.name}</span>

      <div className="">
        <button className="btn-primary" onClick={() => setVisible(!visible)}>
          Borrow
        </button>
      </div>

      {/* {game.borrow_status !== "free" ? (
        <span className="text-xl">
          Available{" "}
          {`${game.available_date?.getDate()}.${
            game.available_date!.getMonth() + 1
          }`}
        </span>
      ) : (
        <>
          <BorrowButton />
        </>
      )} */}
    </div>
  );
};

export default GameCard;

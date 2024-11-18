import { Game } from "@/types/game";
import Image from "next/image";
import { BasicButton } from "./BasicButton";

const GameCard = ({ game }: { game: Game }) => {
  return (
    <div className="flex flex-col">
      <div className="w-[300px] h-[300px] relative">
        <Image
          src={game.image}
          alt="Picture of a board game"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <span className="font-bold text-2xl my-2">{game.name}</span>

      {game.borrow_status !== "free" ? (
        <span className="text-xl">
          Available{" "}
          {`${game.available_date?.getDate()}.${
            game.available_date!.getMonth() + 1
          }`}
        </span>
      ) : (
        <BasicButton text="Borrow" />
      )}
    </div>
  );
};

export default GameCard;

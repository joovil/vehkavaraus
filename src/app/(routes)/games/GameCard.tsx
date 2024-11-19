import { BasicButton } from "@/components/BasicButton";
import { Game } from "@/types/game";
import Image from "next/image";

const GameCard = ({ game }: { game: Game }) => {
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

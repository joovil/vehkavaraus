import { getGamesService } from "@/lib/services/games/getGamesService";
import { Game } from "@/types";
import Image from "next/image";
import BorrowGameButtons from "./components/BorrowGameButtons";

const Games = async () => {
  let games: Game[] = [];

  try {
    games = await getGamesService();
  } catch (error) {
    console.error("Error fetching games:", error);
  }

  return (
    <div className="m-auto flex flex-col items-center gap-y-8">
      <div className="grid w-full gap-8 min-[560px]:grid-cols-2 min-[900px]:grid-cols-3">
        {games.map((g) => (
          <div
            key={g.id}
            className="w-full"
          >
            <div className="relative aspect-[1/1]">
              <Image
                src={g.imageUrl || "/fallbackGame.png"}
                alt="Picture of a board game"
                fill
                sizes="300px"
                className="object-contain"
              />
            </div>
            <span className="my-2 text-2xl font-bold">{g.name}</span>
            <BorrowGameButtons game={g} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;

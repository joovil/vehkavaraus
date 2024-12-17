import ImageBasic from "@/components/ImageBasic";
import { getGamesService } from "@/lib/services/games/getGamesService";
import BorrowGameButtons from "./components/BorrowGameButtons";

const Games = async () => {
  const games = await getGamesService();

  return (
    <div className="m-auto flex w-1/2 grid-cols-[repeat(auto-fit,minmax(300px,auto))] flex-col items-center gap-y-8 min-[1250px]:grid min-[1250px]:justify-between">
      {games.map((g) => (
        <div key={g.id} className="h-[400px]">
          <ImageBasic src={g.imageUrl} />
          <span className="my-2 text-2xl font-bold">{g.name}</span>
          <BorrowGameButtons game={g} />
        </div>
      ))}
    </div>
  );
};

export default Games;

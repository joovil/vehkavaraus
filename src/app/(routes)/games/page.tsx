import ImageBasic from "@/components/ImageBasic";
import { getGamesService } from "@/lib/services/games/getGamesService";
import BorrowGameButtons from "./components/BorrowGameButtons";

const Games = async () => {
  const games = await getGamesService();

  return (
    <div className="w-1/2 gap-y-8 m-auto flex flex-col grid-cols-[repeat(auto-fit,minmax(300px,auto))] items-center min-[1250px]:justify-between min-[1250px]:grid">
      {games.map((g) => (
        <div key={g.id} className="h-[400px]">
          <ImageBasic src={g.imageUrl} />
          <span className="font-bold text-2xl my-2">{g.name}</span>
          <BorrowGameButtons game={g} />
        </div>
      ))}
    </div>
  );
};

export default Games;

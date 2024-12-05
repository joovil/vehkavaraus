import ImageBasic from "@/components/ImageBasic";
import { getAllGames } from "@/database/repositories/gameRepository";
import GameCard from "./components/GameCard";

const Games = async () => {
  const games = await getAllGames();

  // const updateGames = async (id: number) => {
  //   const updatedGame = await getGameByIdService(id);
  //   console.log(updatedGame);
  // };

  return (
    <div className="">
      <div className="w-1/2 gap-y-8 m-auto flex flex-col grid-cols-[repeat(auto-fit,minmax(300px,auto))] items-center min-[1250px]:justify-between min-[1250px]:grid">
        {games.map((g) => (
          <div key={g.id}>
            <ImageBasic src={g.imageUrl} />
            <span className="font-bold text-2xl my-2">{g.name}</span>
            <GameCard game={g} />
          </div>
        ))}
        {/* {games.map((g) => (
          <GameCard key={g.id} game={g} updateGames={updateGames} />
        ))} */}
      </div>
    </div>
  );
};

export default Games;

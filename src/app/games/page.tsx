import GameCard from "@/components/GameCard";
import { getAllGames } from "@/database/repositories/gameRepository";

const Home = async () => {
  const games = await getAllGames();

  return (
    <div>
      <div className="w-3/4 gap-y-8 m-auto grid grid-cols-[repeat(auto-fit,minmax(300px,auto))] justify-between">
        {games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>
    </div>
  );
};

export default Home;

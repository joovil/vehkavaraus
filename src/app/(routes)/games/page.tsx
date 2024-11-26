import { getAllGames } from "@/database/repositories/gameRepository";
import DisplayGames from "./DisplayGames";

const Home = async () => {
  const games = await getAllGames();

  return (
    <DisplayGames games={games} />
    // <div className="">
    //   <div className="w-1/2 gap-y-8 m-auto grid grid-cols-[repeat(auto-fit,minmax(300px,auto))] justify-center xl:justify-between">
    //     {games.map((g) => (
    //       <GameCard key={g.id} game={g} />
    //     ))}
    //   </div>
    // </div>
  );
};

export default Home;

import { getGamesWithCurrentBorrow } from "@/lib/actions/games/getGamesWithCurrentBorrow";
import DisplayAdminPanel from "./DisplayAdminPanel";

const Home = async () => {
  // NOTE: Games are loaded on the server on the first load
  const games = await getGamesWithCurrentBorrow();

  return (
    <main className="w-1/2 m-auto grid gap-y-6">
      <DisplayAdminPanel initialGames={games} />
    </main>
  );
};

export default Home;

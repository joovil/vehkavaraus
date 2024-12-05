import { getGamesWithCurrentBorrowAction } from "@/lib/actions/games/getGamesWithCurrentBorrowAction";
import DisplayAdminPanel from "./DisplayAdminPanel";

const Home = async () => {
  // NOTE: Games are loaded on the server on the first load
  const games = await getGamesWithCurrentBorrowAction();

  return (
    <main className="w-1/2 m-auto grid gap-y-6">
      <DisplayAdminPanel initialGames={games} />
    </main>
  );
};

export default Home;

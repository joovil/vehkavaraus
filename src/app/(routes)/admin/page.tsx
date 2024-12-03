import { getGamesWithCurrentBorrow } from "@/lib/actions/games/getGamesWithCurrentBorrow";
import DisplayAdminPanel from "./DisplayAdminPanel";

export interface GameProp {
  id: number;
  name: string;
  borrow_status: "free" | "borrowed" | "late";
  apartment: string | null;
  borrow_date: Date | null;
  return_date: Date | null;
}

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

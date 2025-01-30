import { adminGamesService } from "@/lib/services/admin/adminGamesService";
import Content from "./Content";

const GamePage = async () => {
  const games = await adminGamesService();

  return (
    <main>
      <Content preloadedGames={games} />
    </main>
  );
};

export default GamePage;

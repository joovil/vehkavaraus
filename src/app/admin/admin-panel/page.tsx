import { adminGamesService } from "@/lib/services/admin/adminGamesService";
import Content from "./Content";

const GamePage = async () => {
  const games = await adminGamesService();

  return <Content preloadedGames={games} />;
};

export default GamePage;

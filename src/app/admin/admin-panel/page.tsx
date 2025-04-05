import { fetchAllAdminGames } from "@/lib/services/admin";
import Content from "./Content";

const GamePage = async () => {
  const games = await fetchAllAdminGames();

  return <Content preloadedGames={games} />;
};

export default GamePage;

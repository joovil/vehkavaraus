import { getAllGamesAction } from "@/lib/actions/getAllGamesAction";
import DisplayGames from "./components/DisplayGames";

const Home = async () => {
  // NOTE: Loads the games before page is loaded for the first time.
  // Subsequent loads happen in client component
  const games = await getAllGamesAction();

  return <DisplayGames games={games} />;
};

export default Home;

import gameRepository from "@/database/repositories/gameRepository";
import DisplayGames from "./DisplayGames";

const Home = async () => {
  const games = await gameRepository.getAllGames();
  console.log(games);

  return <DisplayGames games={games} />;
};

export default Home;

import Game from "@/components/Game";
import { fetchAllGames } from "@/lib/services/games/fetchAllGames";

const Home = async () => {
  const games = await fetchAllGames();

  return (
    <div>
      {games.map((g) => (
        <Game key={g.id} game={g.name} date="asd" status={g.borrow_status} />
      ))}
    </div>
  );
};

export default Home;

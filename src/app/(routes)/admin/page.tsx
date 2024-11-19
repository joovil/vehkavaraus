import { gamesForAdminPanel } from "@/database/repositories/gameRepository";
import { formatDate } from "@/lib/utils/formatDate";
import { BorrowStatuses } from "@/types/game";

interface GameProp {
  id: number;
  name: string;
  borrow_status: BorrowStatuses;
  apartment: string | null;
  borrow_date: Date | null;
  return_date: Date | null;
}

const Home = async () => {
  const games = await gamesForAdminPanel();
  console.log(games);

  return (
    <main>
      <div className="bg-offWhiteV w-1/2 m-auto">
        <div className="grid grid-cols-5 text-xl">
          <span className="font-black">Name</span>
          <span className="font-black">Status</span>
          <span className="font-black">Apartment</span>
          <span className="font-black">Borrowed</span>
          <span className="font-black">Return</span>

          {games.map((g) => {
            return <GameRow key={g.id} game={g} />;
          })}
        </div>
      </div>

      <div>
        <div></div>
      </div>
    </main>
  );
};

const GameRow = ({ game }: { game: GameProp }) => {
  const getCellColor = (status: BorrowStatuses) => {
    switch (status) {
      case "free":
        return "bg-darkGreenV";
      case "borrowed":
        return "bg-orangeV";
      default:
        return "bg-pinkV";
    }
  };

  return (
    <>
      <span>{game.name}</span>
      <span className={getCellColor(game.borrow_status)}>
        {game.borrow_status}
      </span>
      <span>{game.apartment}</span>
      <span>{formatDate(game.borrow_date)}</span>
      <span>{formatDate(game.return_date)}</span>
    </>
  );
};

export default Home;

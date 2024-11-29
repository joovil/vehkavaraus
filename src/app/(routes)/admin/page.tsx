import gameRepository from "@/database/repositories/gameRepository";
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

const colNames = ["Name", "Status", "Apartment", "Borrowed", "Return"];

const Home = async () => {
  const games = await gameRepository.gamesForAdminPanel();
  console.log(games);

  return (
    <main>
      <div className="bg-offWhiteV w-1/2 m-auto shadow-primary p-4">
        <div className="grid grid-cols-5 text-xl gap-y-3">
          {colNames.map((col) => (
            <span key={col} className="font-black">
              {col}
            </span>
          ))}
          {games
            // TODO: check if the sort is needed
            .sort((a, b) => a.id - b.id)
            .map((g) => {
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
        return "bg-darkGreenV text-offWhiteV";
      case "borrowed":
        return "bg-orangeV";
      default:
        return "bg-pinkV";
    }
  };

  return (
    <>
      <span className="overflow-hidden">{game.name}</span>
      <span className={`${getCellColor(game.borrow_status)} w-3/4 text-center`}>
        {game.borrow_status}
      </span>
      <span>{game.apartment?.toUpperCase() || "-"}</span>
      <span>{formatDate(game.borrow_date) || "-"}</span>
      <span>{formatDate(game.return_date) || "-"}</span>
    </>
  );
};

export default Home;

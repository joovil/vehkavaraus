import { formatDate } from "@/lib/utils/formatDate";
import { BorrowStatusesType } from "@/types";
import { GameWithCurrentBorrow } from "./page";

const GameRow = ({
  game,
  setVisible,
  currentGame,
  setCurrentGame,
}: {
  game: GameWithCurrentBorrow;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  currentGame: GameWithCurrentBorrow;
  setCurrentGame: React.Dispatch<React.SetStateAction<GameWithCurrentBorrow>>;
}) => {
  const handler = () => {
    if (currentGame.gameId && currentGame.gameId === game.gameId) {
      setVisible(false);
      return;
    }

    setCurrentGame(game);
    setVisible(true);
  };

  return (
    <>
      <button className="overflow-hidden text-left" onClick={handler}>
        {game.name}
      </button>
      <span className={`${getCellColor(game.borrowStatus)} w-3/4 text-center`}>
        {game.borrowStatus}
      </span>
      <span>{game.apartment || "-"}</span>
      <span>{formatDate(game.borrowDate) || "-"}</span>
      <span>{formatDate(game.dueDate) || "-"}</span>
    </>
  );
};

const getCellColor = (status: BorrowStatusesType) => {
  switch (status) {
    case "free":
      return "bg-darkGreenV text-offWhiteV";
    case "borrowed":
      return "bg-orangeV";
    default:
      return "bg-pinkV";
  }
};

export default GameRow;

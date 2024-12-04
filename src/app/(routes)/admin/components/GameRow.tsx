"use client";

import { formatDate } from "@/lib/utils/formatDate";
import { BorrowStatusesType } from "@/types/borrow";
import { GameProp } from "../DisplayAdminPanel";

const GameRow = ({
  game,
  setShowInfo,
  infoContent,
  setInfoContent,
}: {
  game: GameProp;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
  infoContent: GameProp;
  setInfoContent: React.Dispatch<React.SetStateAction<GameProp>>;
}) => {
  const gameNameClickHandler = () => {
    if (infoContent.id && infoContent.id === game.id) {
      setShowInfo(false);
      return;
    }

    setInfoContent(game);
    setShowInfo(true);
  };

  return (
    <>
      <button
        className="overflow-hidden text-left"
        onClick={gameNameClickHandler}
      >
        {game.name}
      </button>
      <span className={`${getCellColor(game.borrow_status)} w-3/4 text-center`}>
        {game.borrow_status}
      </span>
      <span>{game.apartment?.toUpperCase() || "-"}</span>
      <span>{formatDate(game.borrow_date) || "-"}</span>
      <span>{formatDate(game.return_date) || "-"}</span>
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

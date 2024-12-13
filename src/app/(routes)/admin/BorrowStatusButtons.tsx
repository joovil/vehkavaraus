import { BorrowStatuses } from "@/types";
import { GameWithCurrentBorrow } from "./page";

const borrowStatusList = Object.keys(BorrowStatuses.Enum);

const BorrowStatusButtons = ({ game }: { game: GameWithCurrentBorrow }) => {
  const handlerJunction = (s: string) => {
    const handlers: { [key: string]: () => void } = {
      free: handleFreeButton,
      borrowed: handleBorrowedButton,
      late: handleLateButton,
    };

    handlers[s]();
  };

  const handleFreeButton = () => {
    console.log("Free button clicked");
  };

  const handleBorrowedButton = () => {
    console.log("Borrowed button clicked");
  };

  const handleLateButton = () => {
    console.log("Late button clicked");
  };
  return (
    <div>
      {borrowStatusList
        .filter((status) => status !== game.borrowStatus)
        .map((s) => (
          // TODO: Add functionality to buttons
          <button
            className="btn-primary"
            key={s}
            onClick={() => handlerJunction(s)}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      <></>
    </div>
  );
};

export default BorrowStatusButtons;

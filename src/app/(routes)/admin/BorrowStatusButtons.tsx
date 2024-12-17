import { GameWithCurrentBorrow } from "./page";

// TODO: More admin controls for borrowStatuses
// const borrowStatusList = Object.keys(BorrowStatuses.Enum);
const borrowStatusList = ["free"];

const BorrowStatusButtons = ({
  game,
  updateGame,
}: {
  game: GameWithCurrentBorrow;
  updateGame: (game: GameWithCurrentBorrow) => void;
}) => {
  const handlerJunction = (s: string) => {
    const handlers: { [key: string]: () => void } = {
      free: handleFreeButton,
      borrowed: handleBorrowedButton,
      late: handleLateButton,
    };

    handlers[s]();
  };

  const handleFreeButton = async () => {
    updateGame({
      ...game,
      borrowStatus: "free",
      apartment: null,
      borrowDate: null,
      dueDate: null,
    });
  };

  const handleBorrowedButton = () => {
    console.log("Borrowed button clicked");
  };

  // FIXME: Add an option to mark game as lost
  const handleLateButton = () => {
    console.log("Late button clicked");
  };
  return (
    <div>
      {borrowStatusList
        .filter((status) => status !== game.borrowStatus)
        .map((s) => (
          // TODO: Add functionality to buttons
          <>
            <span>Mark as: </span>
            <button
              className="btn-primary"
              key={s}
              onClick={() => handlerJunction(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          </>
        ))}
      <></>
    </div>
  );
};

export default BorrowStatusButtons;

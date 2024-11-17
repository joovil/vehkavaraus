import { BasicButton } from "./BasicButton";

const Game = async ({
  game,
  date,
  status,
}: {
  game: string;
  date: string;
  status: string;
}) => {
  return (
    <div>
      {/* <Image /> */}
      <span>{game}</span>
      <span>Available {date}</span>
      <span>{status}</span>
      <BasicButton text="Board game" />
    </div>
  );
};

export default Game;

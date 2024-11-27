import borrowRepository from "@/database/repositories/borrowRepository";
import { auth } from "@/lib/utils/auth";
import BorrowRow from "./BorrowRow";

const cols = ["Games borrowed", "Return date", "Return"];

const Home = async () => {
  const session = await auth();
  const borrows = await borrowRepository.getBorrowByIdWithGame(
    session!.user.id
  );
  console.log(borrows);

  return (
    <div className="w-1/2 m-auto flex flex-col gap-y-6">
      <div className="box-basic">
        <h2>{session?.user.username}</h2>
        <div className="grid grid-cols-3 text-xl gap-y-3">
          {cols.map((col) => (
            <h3 key={col}>{col}</h3>
          ))}
          {borrows.map((borrow) => (
            <BorrowRow key={borrow.name} borrow={borrow} />
          ))}
        </div>
      </div>
      <SettingsBox />
    </div>
  );
};

const SettingsBox = () => {
  return (
    <div className="box-basic">
      <h2 className="mb-3">Settings</h2>
      <div className="flex justify-evenly">
        <SettingsForm setting="password" />
        <SettingsForm setting="apartment" />
      </div>
    </div>
  );
};

const SettingsForm = ({ setting }: { setting: string }) => {
  return (
    <div className="basis-0 flex-grow">
      <h3 className="mb-2">Change {setting}</h3>
      <form className="settings-form">
        <div>
          <label>New {setting}</label>
          <input placeholder={`New ${setting}`} />
        </div>

        <div>
          <label className="w-fit">New {setting} again</label>
          <input placeholder={`New ${setting}`} />
        </div>
        <button className="btn-primary">Update {setting}</button>
      </form>
    </div>
  );
};

export default Home;

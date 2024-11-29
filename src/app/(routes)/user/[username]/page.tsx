import borrowRepository from "@/database/repositories/borrowRepository";
import { auth } from "@/lib/utils/auth";
import BorrowRow from "./components/BorrowRow";
import SettingsForms from "./components/SettingsForms";

const cols = ["Games borrowed", "Return date", "Return"];

const Home = async () => {
  const session = await auth();
  const borrows = await borrowRepository.getBorrowByIdWithGame(
    session!.user.id
  );

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

const SettingsBox = async () => {
  return (
    <div className="box-basic">
      <div className="flex">
        <h2 className="mb-3">Settings</h2>
      </div>
      <SettingsForms />
    </div>
  );
};

export default Home;

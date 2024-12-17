import { getBorrowByIdWithGame } from "@/database/repositories/borrowRepository";
import { auth } from "@/lib/utils/auth";
import { redirect } from "next/navigation";
import BorrowRow from "./components/gameReturning/BorrowRow";
import SettingsForms from "./components/userSettings/SettingsForms";
const cols = ["Games borrowed", "Return date", "Return"];

const UserPage = async () => {
  const session = await auth();
  if (!session) redirect("/login");

  const { user } = session;
  const borrows = await getBorrowByIdWithGame(user.id);

  return (
    <main className="m-auto flex w-1/2 flex-col gap-y-6">
      <div className="box-basic">
        <h2>{user.username}</h2>

        <div className="grid grid-cols-3 gap-y-3 text-xl">
          {cols.map((col) => (
            <h3 key={col}>{col}</h3>
          ))}
        </div>
        {borrows.map((b) => (
          <BorrowRow key={b.borrowId} borrow={b} />
        ))}
      </div>

      <div className="box-basic">
        <h2>Settings</h2>
        <SettingsForms />
      </div>
    </main>
  );
};

export default UserPage;

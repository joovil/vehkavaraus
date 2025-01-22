import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { getBorrowByIdWithGame } from "@/database/repositories/borrowRepository";
import { redirect } from "next/navigation";
import BorrowRow from "./components/returnGame/BorrowRow";
import SettingsForms from "./components/userSettings/SettingsForms";

const UserPage = async () => {
  const session = await auth();
  if (!session) redirect("/login");

  const { user } = session;
  const borrows = await getBorrowByIdWithGame(user.id);

  return (
    <div className="sm:flex-grow sm:basis-0">
      <div className="box-basic mb-6">
        <h2 className="pb-2 sm:hidden">Games borrowed</h2>
        <div className="hidden grid-cols-3 sm:grid">
          <h2>Game</h2>
          <h2>Due date</h2>
          <h2>Return</h2>
        </div>

        {borrows.map((b) => (
          <div key={b.borrowId} className="flex flex-col gap-y-6 sm:gap-y-3">
            <BorrowRow borrow={b} />
          </div>
        ))}
      </div>

      <SettingsForms />
    </div>
  );
};

export default UserPage;

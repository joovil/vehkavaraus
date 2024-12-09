import { getBorrowByIdWithGame } from "@/database/repositories/borrowRepository";
import { auth } from "@/lib/utils/auth";
import { redirect } from "next/navigation";
import BorrowRow from "./components/BorrowRow";

const cols = ["Games borrowed", "Return date", "Return"];

const UserPage = async () => {
  const session = await auth();
  if (!session) redirect("/login");

  const { user } = session;
  const borrows = await getBorrowByIdWithGame(user.id);

  return (
    <main className="box-basic w-1/2 m-auto">
      <h2>{user.username}</h2>

      <div className="grid grid-cols-3 text-xl gap-y-3">
        {cols.map((col) => (
          <h3 key={col}>{col}</h3>
        ))}
      </div>
      {borrows.map((b) => (
        <BorrowRow key={b.borrowId} borrow={b} />
      ))}
    </main>
  );
};

export default UserPage;

import { getAdminGames } from "@/database/repositories/adminRepository";
import { getBorrowsByGameId } from "@/database/repositories/borrowRepository";
import { AdminGame, HistoryItem } from "@/types";
import Content from "./Content";

const AdminPanel = async () => {
  const games: AdminGame[] = await getAdminGames();

  const getBorrowHistory = async (id: number): Promise<HistoryItem[]> => {
    "use server";
    const borrows = await getBorrowsByGameId(id);
    return borrows.map((borrow) => ({ ...borrow, gameId: id }));
  };
  console.log(games);

  return (
    <div>
      <h1>Admin Panel</h1>
      <Content
        games={games}
        getBorrowHistory={getBorrowHistory}
      />
    </div>
  );
};

export default AdminPanel;

export interface GameWithCurrentBorrow {
  name: string;
  borrowStatus: "free" | "borrowed" | "late";
  borrowDate: Date | null;
  dueDate: Date | null;
  imageUrl: string | undefined;

  apartment: string | null;
  gameId: number;
}

const AdminPage = async () => {
  // const games = await getGamesWithCurrentBorrowAction();

  return (
    <main className="grid gap-y-6">{/* <GameInfo games={games} /> */}</main>
  );
};

export default AdminPage;

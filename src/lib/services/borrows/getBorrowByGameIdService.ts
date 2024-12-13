import apiFetch from "@/lib/utils/apiFetch";

export const getBorrowByGameIdService = async (
  id: number
): Promise<
  {
    username: string;
    id: number;
    borrowDate: Date;
    returnDate: Date | null;
  }[]
> => {
  const res = await apiFetch(`/borrows/${id}`);
  return await res.json();
};

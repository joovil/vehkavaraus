import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BorrowTableSchema = z.object({
  id: z.number(),
  borrower: z.string(),
  game: z.number(),
  borrow_date: z.date(),
  return_date: z.date(),
});

export type BorrowTable = z.infer<typeof BorrowTableSchema>;

export type Borrow = BorrowTable;
export type NewBorrow = Omit<BorrowTable, "id" | "borrow_date" | "return_date">;
export type BorrowUpdate = Pick<BorrowTable, "return_date">;

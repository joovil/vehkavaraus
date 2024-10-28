import { ColumnType } from "kysely";
import { z } from "zod";

export const BorrowSchema = z.object({
  id: z.number(),
  borrower: z.string(),
  game: z.number(),
  borrow_date: z.date(),
  return_date: z.date(),
});

export const NewBorrowSchema = BorrowSchema.omit({
  id: true,
  borrow_date: true,
  return_date: true,
});

export const BorrowUpdateSchema = BorrowSchema.pick({
  return_date: true,
});

export type Borrow = z.infer<typeof BorrowSchema>;
export type NewBorrow = z.infer<typeof NewBorrowSchema>;
export type BorrowUpdate = z.infer<typeof BorrowUpdateSchema>;

export interface BorrowTable {
  id: ColumnType<number, never, never>;
  borrower: ColumnType<string, string, never>;
  game: ColumnType<number, number, never>;
  borrow_date: ColumnType<Date, never>;
  return_date: ColumnType<Date, never, Date>;
}

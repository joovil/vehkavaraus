import { z } from "zod";
import { TableType } from "./types";

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

export type BorrowTable = TableType<Borrow, NewBorrow, BorrowUpdate>;

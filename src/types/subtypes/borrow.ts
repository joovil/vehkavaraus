import { z } from "zod";
import { TableType } from "./types";

export const BorrowStatuses = z.enum(["free", "borrowed", "late"]);
export type BorrowStatusesType = z.infer<typeof BorrowStatuses>;

export const BorrowSchema = z.object({
  id: z.number(),
  borrowerId: z.string().uuid(),
  gameId: z.coerce.number(),
  borrowDate: z.coerce.date(),
  returnDate: z.coerce.date().nullable(),
  dueDate: z.date(),
});

export const NewBorrowSchema = BorrowSchema.omit({
  id: true,
  borrowDate: true,
  returnDate: true,
  dueDate: true,
});

export const BorrowUpdateSchema = BorrowSchema.pick({
  returnDate: true,
});

export type Borrow = z.infer<typeof BorrowSchema>;
export type NewBorrow = z.infer<typeof NewBorrowSchema>;
export type BorrowUpdate = z.infer<typeof BorrowUpdateSchema>;

export type BorrowTable = TableType<Borrow, NewBorrow, BorrowUpdate>;

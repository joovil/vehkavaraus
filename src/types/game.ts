import { z } from "zod";
import { TableType } from "./types";

export const BorrowStatuses = z.enum(["free", "borrowed", "late"]);
export type BorrowStatuses = z.infer<typeof BorrowStatuses>;

export const GameSchema = z.object({
  id: z.number(),
  name: z.string(),
  borrow_status: BorrowStatuses,
});

export const NewGameSchema = GameSchema.pick({ name: true });
export const GameUpdateSchema = GameSchema.partial().omit({ id: true });

export type Game = z.TypeOf<typeof GameSchema>;
export type NewGame = z.TypeOf<typeof NewGameSchema>;
export type GameUpdate = z.TypeOf<typeof GameUpdateSchema>;

export type GameTable = TableType<Game, NewGame, GameUpdate>;

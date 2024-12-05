import { z } from "zod";
import { BorrowStatuses } from "./borrow";
import { TableType } from "./types";

export const GameSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  borrowStatus: BorrowStatuses,
  available_date: z.date().optional().nullable(),
  imageUrl: z.string().optional(),
  current_borrow: z.number().nullable(),
});

export const NewGameSchema = GameSchema.pick({ name: true, imageUrl: true });
export const GameUpdateSchema = GameSchema.partial().omit({ id: true });

export type Game = z.TypeOf<typeof GameSchema>;
export type NewGame = z.TypeOf<typeof NewGameSchema>;
export type GameUpdate = z.TypeOf<typeof GameUpdateSchema>;

export type GameTable = TableType<Game, NewGame, GameUpdate>;

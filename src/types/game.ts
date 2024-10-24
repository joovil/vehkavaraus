import { Generated, Insertable, Selectable } from "kysely";
import { z } from "zod";

const BorrowStatuses = z.enum(["free", "borrowed", "late"]);
export type BorrowStatuses = z.infer<typeof BorrowStatuses>;

const GameSchema = z.object({
  id: z.string(),
  name: z.string(),
  borrow_status: BorrowStatuses,
});

type GameSchema = z.infer<typeof GameSchema>;

export interface GameTable extends Omit<GameSchema, "id"> {
  id: Generated<string>;
}

export type Game = Selectable<GameTable>;
export type NewGame = Insertable<Omit<GameTable, "id" | "borrow_status">>;
export type GameUpdate = Partial<Omit<GameTable, "id">> & {
  name?: string;
  borrow_status?: BorrowStatuses;
};

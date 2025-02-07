import { z } from "zod";
import { BorrowSchema } from "./borrow";
import { GameSchema } from "./game";
import { UserSchema } from "./user";

// Type used to show games in the game admin panel
export const AdminGameSchema = z.object({
  gameId: GameSchema.shape.id,
  gameName: GameSchema.shape.name,
  borrowStatus: GameSchema.shape.borrowStatus,
  imageUrl: GameSchema.shape.imageUrl,
  borrowDate: BorrowSchema.shape.borrowDate.nullable(),
  dueDate: BorrowSchema.shape.dueDate.nullable(),
  username: UserSchema.shape.username.nullable(),
  apartment: UserSchema.shape.apartment.nullable(),
});

export type AdminGame = z.infer<typeof AdminGameSchema>;

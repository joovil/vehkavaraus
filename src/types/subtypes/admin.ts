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
  borrowDate: BorrowSchema.shape.borrowDate.nullable().optional(),
  dueDate: BorrowSchema.shape.dueDate.nullable().optional(),
  username: UserSchema.shape.username.nullable().optional(),
  apartment: UserSchema.shape.apartment.nullable().optional(),
});

export type AdminGame = z.infer<typeof AdminGameSchema>;

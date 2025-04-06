import { Borrow } from "./borrow";
import { User } from "./user";

export type HistoryItem = Omit<Borrow, "borrowerId"> &
  Pick<User, "username" | "apartment">;

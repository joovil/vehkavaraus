import {
  createGame,
  getGameById,
} from "@/lib/database/repositories/gameRepository";
import { createUser } from "@/lib/database/repositories/userRepository";
import { createBorrowUpdateAvailability } from "@/lib/database/wrappers/createBorrowUpdateAvailability";
import { NewBorrow } from "@/types/borrow";
import { Game, NewGame } from "@/types/game";
import { NewUser, User } from "@/types/user";
import { beforeAll, describe, expect, it } from "vitest";

describe("Game addition", () => {
  const newGame: NewGame = {
    name: "new game",
  };

  const newUser: NewUser = {
    username: "John",
    password_hash: "hash",
    email: "john@site.com",
    apartment: "a1",
  };

  let game: Game;
  let user: User;

  beforeAll(async () => {
    game = await createGame(newGame);
    user = await createUser(newUser);
  });

  it("Updates game availability when borrow is created", async () => {
    const newBorrow: NewBorrow = {
      borrower: user.id,
      game: game.id,
    };

    const borrow = await createBorrowUpdateAvailability(newBorrow);
    const gameAfterBorrow = await getGameById(borrow.game);

    expect(gameAfterBorrow.available_date).toEqual(borrow.return_date);
  });
});

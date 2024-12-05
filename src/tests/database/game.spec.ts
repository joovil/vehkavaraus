import {
  createGame,
  getGameById,
} from "@/database/repositories/gameRepository";
import { createUser } from "@/database/repositories/userRepository";
import { createBorrow } from "@/lib/actions/borrows/createBorrow";
import { Game, NewBorrow, NewGame, NewUser, User } from "@/types";
import { beforeAll, describe, expect, it } from "vitest";

describe("Game addition", () => {
  const newGame: NewGame = {
    name: "new game",
  };

  const newUser: NewUser = {
    username: "John",
    passwordHash: "hash",
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
      borrowerId: user.id,
      gameId: game.id,
    };

    const borrow = await createBorrow(newBorrow);
    const gameAfterBorrow = await getGameById(borrow.gameId);

    expect(gameAfterBorrow.availableDate).toEqual(borrow.returnDate);
  });
});

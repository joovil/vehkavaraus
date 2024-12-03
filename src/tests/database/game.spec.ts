import gameRepository from "@/database/repositories/gameRepository";
import userRepository from "@/database/repositories/userRepository";
import { createBorrow } from "@/lib/actions/borrows/createBorrow";
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
    game = await gameRepository.createGame(newGame);
    user = await userRepository.createUser(newUser);
  });

  it("Updates game availability when borrow is created", async () => {
    const newBorrow: NewBorrow = {
      borrower: user.id,
      game: game.id,
    };

    const borrow = await createBorrow(newBorrow);
    const gameAfterBorrow = await gameRepository.getGameById(borrow.game);

    expect(gameAfterBorrow.available_date).toEqual(borrow.return_date);
  });
});

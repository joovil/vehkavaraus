import { createNewGame } from "@/server/services/createNewGame";
import { createUser } from "@/server/services/users/createNewUser";

export const GET = async (req: Request) => {
  const user = await createUser("asd", "pass", "a1");
  const game = await createNewGame("board game");

  console.log(user);
  console.log(game);

  console.log(req.headers);
  const res = { hello: "hello" };
  return Response.json(res);
};

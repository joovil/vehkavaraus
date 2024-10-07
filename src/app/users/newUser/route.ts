import { createUser } from "@/server/services/createNewUser";

export const POST = async (req: Request) => {
  const { username, password, apartment } = await req.json();

  try {
    const newUser = await createUser(username, password, apartment);
    return Response.json({ newUser });
  } catch (error) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }
    return Response.json({ message }, { status: 404 });
  }
};

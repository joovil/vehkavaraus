import borrowRepository from "@/database/repositories/borrowRepository";

export const GET = async () => {
  try {
    const res = await borrowRepository.getAllBorrows();
    return Response.json(res);
  } catch (error) {
    const message = "Unknown error";

    if (error instanceof Error) {
      return Response.json({ message }, { status: 404 });
    }

    return Response.json({ message }, { status: 404 });
  }
};
// TODO: Implement POST route
export const POST = async (_req: Request) => {
  return Response.json({ message: "Not implemented" }, { status: 400 });
};

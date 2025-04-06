import { getBorrowsByGameId } from "@/database/repositories/borrowRepository";

export const GET = async (
  _req: Request,
  props: { params: Promise<{ id: number }> },
) => {
  const params = await props.params;
  const borrows = await getBorrowsByGameId(params.id);
  return Response.json(borrows);
};

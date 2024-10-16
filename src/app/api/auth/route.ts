export const GET = async () => {
  return Response.json({ error: "No confirmation token" }, { status: 400 });
};

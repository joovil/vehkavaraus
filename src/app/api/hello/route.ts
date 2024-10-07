export const GET = async (req: Request) => {
  console.log(req.headers);
  const res = { hello: "hello" };
  return Response.json(res);
};

import { put } from "@vercel/blob";

export const POST = async (req: Request) => {
  const fd = await req.formData();
  const file = fd.get("file") as File;

  const blob = await put(`vehka/${file.name}`, file, {
    access: "public",
  });

  return Response.json(blob);
};

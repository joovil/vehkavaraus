import { lateGameCheck } from "@/database/repositories/gameRepository";

export const GET = async (req: Request) => {
  try {
    const authHeader = req.headers.get("Authorization");
    console.log(authHeader);
    console.log(process.env.CRON_SECRET);

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json(
        {
          error: "Invalid authorization header",
        },
        {
          status: 401,
        },
      );
    }

    await lateGameCheck();
    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return new Response("Internal server error", { status: 500 });
  }
};

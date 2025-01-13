import logger from "@/lib/utils/logger";

export const GET = () => {
  logger.logYellow("asdasd");
  console.log("dsadsa ", "vvv");
  return new Response(null, {
    status: 302,
    headers: {
      Location: "http://localhost:3000/games",
    },
  });
};

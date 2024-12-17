import logger from "@/lib/utils/logger";

export const GET = () => {
  logger.logYellow("asdasd");
  console.log("dsadsa ", "vvv");
  return Response.json(Math.random());
};

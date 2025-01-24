// TODO: Send email to users with games that are late

import { CronJob } from "cron";
import { sql } from "kysely";
import db from "..";

const lateGameCheck = async () => {
  await db
    .updateTable("games")
    .set("borrowStatus", "late")
    .where("availableDate", "<", () => sql`NOW()::TIMESTAMP`)
    .execute();

  console.log("Late games updated");
};

export const lateGameJob = new CronJob(
  "0 8 * * * *",
  lateGameCheck,
  null,
  true,
  "UTC+2",
);

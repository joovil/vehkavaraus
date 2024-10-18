import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default (phase) => {
  /**
   * @type {import('next').NextConfig}
   */

  if (phase === PHASE_DEVELOPMENT_SERVER && phase === PHASE_PRODUCTION_BUILD) {
    const requiredEnvVars = [
      "DB_NAME",
      "DB_HOST",
      "DB_USER",
      "DB_PASSWORD",
      "DB_PORT",
      "TOKEN_SECRET",
      "NEXT_PUBLIC_API_URL",
      "NEXTAUTH_URL",
      "NEXTAUTH_SECRET",
    ];

    requiredEnvVars.forEach((envVar) => {
      if (!process.env[envVar]) {
        throw new Error(`\x1b[31m${envVar} is missing\x1b[0m`);
      }
    });

    if (isNaN(Number(process.env.DB_PORT))) {
      throw new Error(`\x1b[31mDB_PORT must be a number\x1b[0m`);
    }
  }

  const nextConfig = {};

  return nextConfig;
};

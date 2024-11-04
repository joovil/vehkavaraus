// export const dbClient = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: String(process.env.DB_PASSWORD), // Ensure the password is a string
//   port: Number(process.env.DB_PORT),
// });

// import { DB_HOST } from "@/lib/utils/envVariables";

// const dialect = new PostgresDialect({
//   pool: new Pool({
//     connectionString: "postgres://postgres:pass@localhost:5433/vehka",
//     user: "postgres",
//     host: "localhost",
//     database: "vehka",
//     password: "pass", // Ensure the password is a string
//     port: 5433,
//     max: 10,
//   }),
// });

// export const db = new Kysely<Database>({
//   dialect,
// });

// export const testFunc = () => {
//   console.log("setup.ts");
//   console.log(process.env.NODE_ENV);
//   console.log(process.env.NEXT_PUBLIC_API_URL);
//   console.log(DB_HOST);
// };

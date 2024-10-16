const DB_NAME = process.env.DB_NAME!;
const DB_HOST = process.env.DB_HOST!;
const DB_USER = process.env.DB_USER!;
const DB_PASSWORD = process.env.DB_PASSWORD!;
const DB_PORT = parseInt(process.env.DB_PORT!);
const TOKEN_SECRET = process.env.TOKEN_SECRET!;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL!;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!;

export {
  DB_NAME,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  TOKEN_SECRET,
  NEXT_PUBLIC_API_URL,
  NEXTAUTH_SECRET,
};

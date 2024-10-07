if (!process.env.DB_NAME) {
  throw new Error(`DB_NAME is missing`);
}
const DB_NAME = process.env.DB_NAME;

if (!process.env.DB_HOST) {
  throw new Error(`DB_HOST is missing`);
}
const DB_HOST = process.env.DB_HOST;

if (!process.env.DB_USER) {
  throw new Error(`DB_USER is missing`);
}
const DB_USER = process.env.DB_USER;

if (!process.env.DB_PASSWORD) {
  throw new Error(`DB_PASSWORD is missing`);
}
const DB_PASSWORD = process.env.DB_PASSWORD;

if (!process.env.DB_PORT) {
  throw new Error(`DB_PORT is missing`);
}
const DB_PORT = parseInt(process.env.DB_PORT);

if (!process.env.TOKEN_SECRET) {
  throw new Error(`TOKEN_SECRET is missing`);
}
const TOKEN_SECRET = process.env.TOKEN_SECRET;

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(`NEXT_PUBLIC_API_URL is missing`);
}
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export {
  DB_NAME,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  TOKEN_SECRET,
  NEXT_PUBLIC_API_URL,
};

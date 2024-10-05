export const DB_NAME = process.env.DB_NAME
export const DB_HOST = process.env.DB_HOST
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

if (!DB_NAME) {
  throw new Error(`${DB_NAME} is missing`);
}

if (!DB_HOST) {
  throw new Error(`${DB_HOST} is missing`);
}

if (!DB_USER) {
  throw new Error(`${DB_USER} is missing`);
}

if (!DB_PASSWORD) {
  throw new Error(`${DB_PASSWORD} is missing`);
}

if (!process.env.DB_PORT) {
  throw new Error(`${process.env.DB_PORT} is missing`);
}

export const DB_PORT = parseInt(process.env.DB_PORT)

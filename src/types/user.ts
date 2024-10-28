import { ColumnType } from "kysely";
import { z } from "zod";

export const RolesEnum = z.enum(["unverified", "user", "admin"]);
export type RolesType = z.infer<typeof RolesEnum>;

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  password_hash: z.string(),
  email: z.string().email(),
  apartment: z.string(),
  role: RolesEnum,
});

export const NewUserSchema = UserSchema.omit({
  id: true,
  password_hash: true,
  role: true,
});

export const UserUpdateSchema = UserSchema.partial().omit({
  id: true,
});

export type User = z.TypeOf<typeof UserSchema>;
export type NewUser = z.TypeOf<typeof NewUserSchema>;
export type UserUpdate = z.TypeOf<typeof UserUpdateSchema>;

export interface UserTable {
  id: ColumnType<string, never, never>;
  username: ColumnType<string, string, string>;
  password_hash: ColumnType<never, never, string>;
  email: ColumnType<string, string, string>;
  apartment: ColumnType<string, string, string>;
  role: ColumnType<string, never, string>;
}

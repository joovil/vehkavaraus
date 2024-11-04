import { z } from "zod";
import { TableType } from "./types";

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
  role: true,
});

export const UserUpdateSchema = UserSchema.partial().omit({
  id: true,
});

export type User = z.TypeOf<typeof UserSchema>;
export type NewUser = z.TypeOf<typeof NewUserSchema>;
export type UserUpdate = z.TypeOf<typeof UserUpdateSchema>;

export type UserTable = TableType<User, NewUser, UserUpdate>;

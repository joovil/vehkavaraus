import { Generated, Selectable } from "kysely";
import { z } from "zod";

const Roles = z.enum(["unverified", "user", "admin"]);
export type Roles = z.infer<typeof Roles>;

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  password_hash: z.string(),
  email: z.string().email(),
  apartment: z.string(),
  role: Roles,
});

type UserSchema = z.infer<typeof UserSchema>;

export interface UserTable extends Omit<UserSchema, "id"> {
  id: Generated<string>;
}

export type User = Selectable<UserTable>;
export type NewUser = Omit<User, "id" | "role">;
export type UserUpdate = Partial<Omit<User, "id">>;

export type UserClient = Pick<UserTable, "password_hash">;

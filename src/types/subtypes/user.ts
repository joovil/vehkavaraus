import { z } from "zod";
import { TableType } from "./types";

export const RolesEnum = z.enum(["unverified", "user", "admin"]);
export type RolesType = z.infer<typeof RolesEnum>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(1),
  passwordHash: z.string(),
  email: z.string().email(),
  apartment: z
    .string()
    .regex(/^[abAB]\d{1,3}$/, { message: "Invalid apartment" })
    .min(1, { message: "Apartment required" }),
  role: RolesEnum,
});

export const NewUserSchema = UserSchema.omit({
  id: true,
  role: true,
});

export const UserToCreateSchema = NewUserSchema.omit({
  passwordHash: true,
}).extend({
  password: z.string().min(1),
});

export const UserUpdateSchema = UserSchema.partial().omit({
  id: true,
});

export type User = z.TypeOf<typeof UserSchema>;
export type NewUser = z.TypeOf<typeof NewUserSchema>;
export type userToCreate = z.TypeOf<typeof UserToCreateSchema>;
export type UserUpdate = z.TypeOf<typeof UserUpdateSchema>;

export type UserTable = TableType<User, NewUser, UserUpdate>;

export const UserClientSchema = UserSchema.omit({
  passwordHash: true,
  id: true,
});

export type UserClient = z.TypeOf<typeof UserClientSchema>;

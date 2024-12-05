import { UserClient } from "./user";

declare module "next-auth" {
  interface Session {
    user: UserClient & {
      id: string;
    };
  }

  interface User extends UserClient {
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserClient & {
      id: string;
    };
  }
}

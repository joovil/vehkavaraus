import { UserClient } from "@/types/types";

declare module "next-auth" {
  interface Session {
    user: UserClient;
  }

  interface User {
    id: string;
    username: string;
    apartment: string;
    role: Roles | undefined;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: UserClient;
  }
}

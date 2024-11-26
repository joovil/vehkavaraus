"use client";

import { UserClient } from "@/types/user";
import Link from "next/link";
import { redirect } from "next/navigation";

export const LoginLogout = ({ user }: { user: UserClient | undefined }) => {
  if (!user || user === undefined) {
    return (
      <Link href={"/login"} className="font-semibold">
        Log in
      </Link>
    );
  }

  return (
    <div className="flex flex-col ml-auto text-right text-lg">
      <span className="font-semibold text-xl">{user.username}</span>
      <button onClick={() => redirect("/api/auth/signout")}>Log out</button>
    </div>
  );
};

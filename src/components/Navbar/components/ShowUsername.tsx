"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export const ShowUsername = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user || user === undefined) {
    return (
      <div className="flex flex-col">
        <Link
          href="/login"
          className="font-semibold"
        >
          Log in
        </Link>
        <Link href={`/signup`}>Sign up</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Link
        href={`/user/${user.username}`}
        className="text-center text-xl font-semibold hover:underline"
      >
        {user.username}
      </Link>
      <LogoutButton />
    </div>
  );
};

export default ShowUsername;

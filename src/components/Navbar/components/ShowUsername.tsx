"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export const ShowUsername = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user || user === undefined) {
    return (
      <>
        <Link href="/login" className="font-semibold">
          Log in
        </Link>
        <Link href={`/signup`}>Sign up</Link>
      </>
    );
  }

  return (
    <>
      <Link href={`/user/${user.username}`} className="text-xl font-semibold">
        {user.username}
      </Link>
      <LogoutButton />
    </>
  );
};

export default ShowUsername;

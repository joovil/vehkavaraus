import { auth } from "@/lib/utils/auth";
import { UserClient } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="m-auto flex h-24 w-1/2 items-center">
      <Link href={"/games"}>
        <div className="flex items-center">
          <Image
            src="/icons/vehka_horizontal_pink.svg"
            height={0}
            width={0}
            alt="Pink vehka logo"
            className="mr-3 h-auto w-32"
          />
          <span className="text-2xl font-bold">
            Vehkapolku&apos;s <span className="italic">Rent-A-Game</span>
          </span>
          {/* <ThemeSwitch>Switch theme</ThemeSwitch> */}
        </div>
      </Link>
      <div className="ml-auto flex flex-col text-right text-lg">
        <LoginLogout user={session?.user} />
      </div>
    </nav>
  );
}

export const LoginLogout = async ({
  user,
}: {
  user: UserClient | undefined;
}) => {
  if (!user || user === undefined) {
    return (
      <>
        <Link href="/login" className="font-semibold">
          Log in
        </Link>
        <SignUp />
      </>
    );
  }

  return (
    <div className="ml-auto flex flex-col text-right text-lg">
      <Link href={`/user/${user.username}`} className="text-xl font-semibold">
        {user.username}
      </Link>
      <LogoutButton />
    </div>
  );
};

const SignUp = async () => {
  return <Link href={`/signup`}>Sign up</Link>;
};

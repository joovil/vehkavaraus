import Image from "next/image";
import Link from "next/link";
import ShowUsername from "./components/ShowUsername";

export default async function Navbar() {
  return (
    <nav className="relative flex items-center justify-between py-4 sm:justify-normal md:static">
      <Link href={"/games"} className="hidden sm:block">
        <div className="flex-center flex">
          <Image
            src="/icons/vehka_horizontal_pink.svg"
            height={0}
            width={0}
            alt="Pink vehka logo"
            className="mr-3 h-auto w-32"
          />
        </div>
      </Link>

      <Link href={"/games"} className="text-2xl font-bold">
        <span className="block md:inline-block">Vehkapolku&apos;s</span>
        <span className="block italic md:inline-block">Rent-A-Game</span>
      </Link>

      <div className="flex flex-col text-right text-lg sm:ml-auto">
        <ShowUsername />
        {/* <LogoutButton /> */}
      </div>
    </nav>
  );
}

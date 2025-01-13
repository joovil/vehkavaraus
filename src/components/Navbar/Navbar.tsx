import Image from "next/image";
import Link from "next/link";
import ShowUsername from "./ShowUsername";

export default async function Navbar() {
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
        <ShowUsername />
      </div>
    </nav>
  );
}

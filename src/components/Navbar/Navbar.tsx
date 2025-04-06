import Link from "next/link";
import Logo from "./components/Logo";
import ShowUsername from "./components/ShowUsername";

export default async function Navbar() {
  return (
    <nav className="relative flex items-center justify-between py-4 sm:justify-normal md:static">
      <Logo />

      <Link
        href={"/games"}
        className="text-2xl font-bold"
      >
        <span className="block md:inline-block">Vehkapolku&apos;s&nbsp;</span>
        <span className="block italic md:inline-block">Rent-A-Game</span>
      </Link>

      <div className="text-right text-lg sm:ml-auto">
        <ShowUsername />
      </div>
    </nav>
  );
}

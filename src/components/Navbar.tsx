import Image from "next/image";

export default async function Navbar() {
  return (
    <nav className="flex items-center justify-center my-4">
      <Image
        src="/icons/vehka_horizontal_pink.svg"
        height={0}
        width={0}
        alt="Pink vehka logo"
        className="mr-3 h-auto w-32"
      />
      <span className="font-bold text-2xl">
        Vehkapolku&apos;s <span className="italic">Rent-A-Game</span>
      </span>
    </nav>
  );
}

import Image from "next/image";

export default async function Navbar() {
  return (
    <nav className="w-1/2 h-24 m-auto flex items-center">
      <div className="flex items-center">
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
      </div>

      <div className="flex flex-col ml-auto text-right text-lg">
        <span className="font-semibold">Log in</span>
        <span>Send a message</span>
      </div>
    </nav>
  );
}

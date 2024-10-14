import { VehkaHorizontal } from "./components/icons/VehkaHorizontal";

export default function Home() {
  return (
    <div className="flex h-screen w-100 items-center justify-center">
      <div
        className="
      flex flex-col
      items-center justify-center
      bg-offWhite 
      shadow-[5px_5px_10px_0_rgba(0,0,0,0.75)]
      mx-10
      p-10
      "
      >
        <div className="flex items-center justify-center  font-circularBold text-2xl sm:text-4xl text-center">
          Site under construction
        </div>
        <div className="mt-7">
          <VehkaHorizontal className="fill-pink h-full w-full object-scale-down" />
        </div>
      </div>
    </div>
  );
}

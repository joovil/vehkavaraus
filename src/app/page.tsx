"use client";

import { BasicButton } from "@/components/BasicButton";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center text-2xl">
      <div className="bg-offWhiteV flex-col h-fit p-5 shadow-[5px_5px_10px_0_rgba(0,0,0,0.3)]">
        <h1 className="font-bold mb-3 text-center text-3xl">Log in</h1>
        <form className="flex flex-col">
          <label>Username</label>
          <input className="p-1" name="username"></input>

          <label className="mt-4">Password</label>
          <input className="p-1" name="password" type="password"></input>

          <div className="flex w-full justify-center">
            <BasicButton text="Log in" />
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  const handleLogin = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", {
      username: e.target.username.value,
      password: e.target.password.value,
      callbackUrl: "/games",
    });
  };

  return (
    <div className="w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
      <div className="bg-offWhiteV flex-col h-fit p-5 shadow-primary">
        <h1 className="font-bold mb-3 text-center text-3xl">Log in</h1>

        <form className="flex flex-col" onSubmit={handleLogin}>
          <label>Username</label>
          <input
            className="p-1"
            name="username"
            placeholder="Username"
            // This is stupid but autofill looks more stupid without this
            readOnly
            onFocus={(event) => event.target.removeAttribute("readonly")}
          ></input>

          <label className="mt-4">Password</label>
          <input
            className="p-1"
            name="password"
            type="password"
            placeholder="Password"
          ></input>

          <div className="flex w-full justify-center mt-3">
            <button className="btn-primary">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { showError } from "@/lib/utils/showError";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      username: e.target.username.value,
      password: e.target.password.value,
      redirect: false,
    });

    if (res?.status === 200) {
      router.push("/");
    } else {
      showError(setErrorMessage, "Invalid credentials");
    }
  };

  return (
    <div className="absolute left-1/2 top-1/2 w-fit -translate-x-1/2 -translate-y-1/2 text-2xl">
      <div className="box-basic">
        <h1 className="mb-3 text-center text-3xl font-bold">Log in</h1>

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

          <div className="mt-3 flex w-full justify-center">
            <button className="btn-primary">Log in</button>
          </div>
        </form>
        <div className="mt-2 text-center text-red-800">{errorMessage}</div>
      </div>
    </div>
  );
}

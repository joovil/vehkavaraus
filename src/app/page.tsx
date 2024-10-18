"use client";

import { useState } from "react";
import { UserClient, UserCredentials } from "../types/types";
import { loginUser } from "../lib/services/auth/loginUser";
import { fetchAllUsers } from "@/lib/services/users/fetchAllUsers";
import { fetchUserById } from "@/lib/services/users/fetchUserById";
import { fetchUserByName } from "@/lib/services/users/fetchUserByName";
import { fetchAllGames } from "@/lib/services/games/fetchAllGames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const data = useSession();

  const [persons, setPersons] = useState<UserClient[]>([]);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div>Hello</div>
      <div>{data.user}</div>
      <div className="flex flex-row w-full h-fit  items-center text-center">
        <div className="w-1/2 flex justify-end">
          <FirstHalf setPersons={setPersons} persons={persons} />
        </div>
        <div className="h-full flex items-center">
          <hr className="h-full w-0.5 bg-white mx-5" />
        </div>
        <div className="w-1/2">
          <SecondHalf persons={persons} />
        </div>
      </div>
    </div>
  );
}

const FirstHalf = ({
  setPersons,
  persons,
}: {
  setPersons: React.Dispatch<React.SetStateAction<UserClient[]>>;
  persons: UserClient[];
}) => {
  const [newApartment, setNewApartment] = useState<string>("");
  const [updateId, setUpdateId] = useState<string>("");
  const [person, _setPerson] = useState<UserClient>();
  const router = useRouter();

  const handleGetPersons = async () => {
    const res = await fetchAllUsers();
    const data = await res.json();

    const isPersonArray = (data: UserClient[]): data is UserClient[] => {
      return (
        Array.isArray(data) &&
        data.every(
          (item) =>
            typeof item.id === "string" && typeof item.apartment === "string"
        )
      );
    };

    if (isPersonArray(data)) {
      setPersons(data);
    } else {
      console.error("Invalid data format");
    }
  };

  return (
    <div className="w-fit">
      <div className="w-full flex flex-col-reverse items-center">
        {persons.map((p) => (
          <div className="bg-slate-700 my-1 w-fit px-2 rounded-lg" key={p.id}>
            {p.apartment}
          </div>
        ))}
      </div>
      <div></div>
      <button
        className="bg-slate-800 p-1 rounded-lg mb-1"
        onClick={() => router.push("/api/auth/signin")}
      >
        Login page
      </button>
      <button
        className="bg-slate-800 p-1 rounded-lg mb-1"
        onClick={() => router.push("/api/auth/signout")}
      >
        Logout page
      </button>
      <button
        className="bg-slate-800 p-1 rounded-lg mb-1"
        onClick={handleGetPersons}
      >
        getPersons()
      </button>
      <div className="flex flex-col">
        <button className="bg-slate-800 p-1 rounded-lg mb-1">
          Unused button
        </button>

        <label>New apartment</label>
        <input
          className="text-black"
          onChange={(e) => setNewApartment(e.target.value)}
          value={newApartment}
        />

        <label>Person id</label>
        <input
          className="text-black"
          onChange={(e) => setUpdateId(e.target.value)}
          value={updateId}
        />
        {person?.id}
        {person?.apartment}
      </div>
    </div>
  );
};

const SecondHalf = ({ persons }: { persons: UserClient[] }) => {
  const [token, setToken] = useState("");

  const handleExposed = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const credentials: UserCredentials = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    const res = await loginUser(credentials);

    if (res.status == 200) {
      const token = await res.json();
      setToken(token.token);
    }
  };

  const handleGetById = async () => {
    const res = await fetchUserById(persons[0].id);
    console.log(await res.json());
  };

  const handleGetByUsername = async () => {
    const res = await fetchUserByName(persons[0].username);
    console.log(await res.json());
  };

  const handleGetAllGames = async () => {
    const res = await fetchAllGames();
    console.log(await res.json());
  };

  return (
    <div className="w-fit space-y-2">
      <div className="flex flex-col justify-center space-y-2">
        <form className="space-y-1" onSubmit={(e) => e.preventDefault()}>
          <button className="bg-slate-800 p-1 rounded-lg mt-1" type="submit">
            Create person
          </button>

          <div>
            <label>Username</label>
            <input className="float-right ml-1 text-black" name="username" />
          </div>
          <div>
            <label>Password</label>
            <input className="float-right ml-1 text-black" name="password" />
          </div>
          <div>
            <label>Apartment</label>
            <input className="float-right ml-1 text-black" name="apartment" />
          </div>
        </form>
        <form className="space-y-1" onSubmit={handleExposed}>
          <button className="bg-slate-800 p-1 rounded-lg mt-1" type="submit">
            Login
          </button>
          <div>
            <label>Username</label>
            <input className="float-right ml-1 text-black" name="username" />
          </div>
          <div>
            <label>Password</label>
            <input className="float-right ml-1 text-black" name="password" />
          </div>
        </form>
      </div>
      {token && <div>token: {token.substring(0, 5)}</div>}
      <div className="space-x-2">
        <button
          className="bg-slate-800 p-1 rounded-lg mt-1"
          onClick={handleGetById}
        >
          fetchById
        </button>
        <button
          className="bg-slate-800 p-1 rounded-lg mt-1"
          onClick={handleGetByUsername}
        >
          fetchByUsername
        </button>
        <button
          className="bg-slate-800 p-1 rounded-lg mt-1"
          onClick={handleGetAllGames}
        >
          getAllGames
        </button>
      </div>
    </div>
  );
};

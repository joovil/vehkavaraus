"use client";

import { useState } from "react";
import { ClientUser, UserCredentials } from "../lib/types";
import { loginUser } from "../services/auth/loginUser";
import { fetchAllUsers } from "@/services/users/fetchAllUsers";
import { fetchUserById } from "@/services/users/fetchUserById";
import { fetchUserByName } from "@/services/users/fetchUserByName";
import { fetchAllGames } from "@/services/games/fetchAllGames";

export default function Home() {
  const [persons, setPersons] = useState<ClientUser[]>([]);
  const [person, _setPerson] = useState<ClientUser>();
  const [newApartment, setNewApartment] = useState<string>("");
  const [updateId, setUpdateId] = useState<string>("");
  const [token, setToken] = useState("");

  const handleGetPersons = async () => {
    const res = await fetchAllUsers();
    const data = await res.json();

    const isPersonArray = (data: ClientUser[]): data is ClientUser[] => {
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
    <div className="flex flex-col w-fit m-auto text-center">
      Hello
      <button
        className="bg-slate-800 p-1 rounded-lg mb-1"
        onClick={handleGetPersons}
      >
        getPersons()
      </button>
      <div className="flex flex-col">
        <button
          className="bg-slate-800 p-1 rounded-lg mb-1"
          // onClick={handlePersonApartmentUpdate}
        >
          updatePersonApartment()
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
      <div className="flex flex-col m-auto">
        {persons.map((p) => (
          <div className="bg-slate-700 my-1 w-fit px-2 rounded-lg" key={p.id}>
            {p.apartment}
          </div>
        ))}
      </div>
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
      {token && <div>token: {token.substring(0, 5)}</div>}
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
  );
}

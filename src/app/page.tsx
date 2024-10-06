"use client";

import { useState } from "react";
import { ClientUser } from "../types";
import apiFetch from "./utils/apiFetch";

export default function Home() {
  const [persons, setPersons] = useState<ClientUser[]>([]);
  const [person, setPerson] = useState<ClientUser>();
  const [newApartment, setNewApartment] = useState<string>("");
  const [updateId, setUpdateId] = useState<string>("");

  const handleGetPersons = async () => {
    const data = await apiFetch("/api/person");

    const isPersonArray = (data: any): data is ClientUser[] => {
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

  // const handlePersonApartmentUpdate = async () => {
  //   const newPerson = await actUpdatePersonApartment(updateId, newApartment);
  //   setPerson(newPerson);
  // };

  // const handleCreatePerson = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("hello");
  //   const username = e.currentTarget.username.value;
  //   const password = e.currentTarget.password.value;
  //   const apartment = e.currentTarget.apartment.value;

  //   const newPerson = await actCreatePerson(username, password, apartment);
  //   console.log(newPerson);
  // };

  return (
    <div className="mt-64 flex flex-col w-fit m-auto text-center">
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
      <form
        className="space-y-1"
        // onSubmit={handleCreatePerson}
      >
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
    </div>
  );
}

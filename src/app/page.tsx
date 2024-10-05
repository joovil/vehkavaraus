"use client";

import { useState } from "react";
import { ClientPerson } from "../types";
import apiFetch from "./utils/apiFetch";
import { updatePersonApartment } from "@/server/Routes/PersonRoutes";
import { actUpdatePersonApartment } from "./actions/PersonActions";

export default function Home() {
  const [persons, setPersons] = useState<ClientPerson[]>([]);
  const [person, setPerson] = useState<ClientPerson>();
  const [newApartment, setNewApartment] = useState<string>("");
  const [updateId, setUpdateId] = useState<string>("");

  const handleGetPersons = async () => {
    const data = await apiFetch("/api/person");

    const isPersonArray = (data: any): data is ClientPerson[] => {
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

  const handlePersonApartmentUpdate = async () => {
    const newPerson = await actUpdatePersonApartment(updateId, newApartment);
    setPerson(newPerson);
  };

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
          onClick={handlePersonApartmentUpdate}
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
    </div>
  );
}

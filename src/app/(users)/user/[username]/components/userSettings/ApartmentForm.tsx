"use client";

import { useDisplayMessage } from "@/components/useDisplayMessage";
import updateApartmentService from "@/lib/services/users/updateApartmentService";
import { useState } from "react";
import { SettingsFormElements, validValues } from "./SettingsForms";

const ApartmentForm = ({
  setMessage,
}: {
  setMessage: (message: string) => void;
}) => {
  const [apartment, setApartment] = useState<string>("");
  const [apartment2, setApartment2] = useState<string>("");

  const [showMobile, mobileMessage] = useDisplayMessage();
  const [showError, errorMessage] = useDisplayMessage();

  const handleApartmentChange = async (
    e: React.FormEvent<SettingsFormElements>,
  ) => {
    e.preventDefault();

    if (!validValues(apartment, apartment2)) {
      showError("Fields must match");
      return;
    }

    try {
      await updateApartmentService(apartment);

      setApartment("");
      setApartment2("");

      showMobile("Apartment updated");
      setMessage("Apartment updated");
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    }
  };

  const validInput =
    (apartment === apartment2 && apartment.match(/^[abAB]\d{1,3}$/)) ||
    (apartment.length === 0 && apartment2.length === 0);

  return (
    <div className="flex flex-col text-lg sm:flex-grow">
      <span className="text-xl sm:hidden">{mobileMessage}</span>

      <form
        className="flex w-full flex-col text-lg [&>input]:max-w-80"
        onSubmit={handleApartmentChange}
      >
        <h3>Update apartment</h3>
        <label>Apartment</label>
        <input
          name="val1"
          type="text"
          value={apartment}
          onChange={(e) => setApartment(e.target.value)}
          placeholder="New apartment"
          className={`${!validInput ? "bg-red-200" : ""}`}
        />

        <label>Apartment again</label>
        <input
          name="val2"
          type="text"
          value={apartment2}
          onChange={(e) => setApartment2(e.target.value)}
          placeholder="New apartment"
          className={`${!validInput ? "bg-red-200" : ""}`}
        />

        <button
          className="btn-primary mt-2"
          disabled={!validInput}
        >
          Submit
        </button>
      </form>

      <span className="mt-2 text-red-800">{errorMessage}</span>
    </div>
  );
};

export default ApartmentForm;

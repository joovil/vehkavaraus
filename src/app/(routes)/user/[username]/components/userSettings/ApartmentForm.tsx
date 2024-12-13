"use client";

import updateApartmentService from "@/lib/services/users/updateApartmentService";
import { useState } from "react";
import { SettingsFormElements, validValues } from "./SettingsForms";
import SingleForm from "./SingleForm";

const ApartmentForm = () => {
  const [apartmentError, setApartmentError] = useState<string>("");

  const handleApartmentChange = async (
    e: React.FormEvent<SettingsFormElements>
  ) => {
    e.preventDefault();

    const newApartment = e.currentTarget.elements.val1.value;
    const newApartment2 = e.currentTarget.elements.val2.value;

    if (!validValues(newApartment, newApartment2)) return;

    const res = await updateApartmentService(newApartment);

    if (res.status !== 200) {
      const data = await res.json();
      setApartmentError(data.error);
    }
  };

  return (
    <SingleForm
      setting="apartment"
      handler={handleApartmentChange}
      errorMessage={apartmentError}
      errorSetter={setApartmentError}
    />
  );
};

export default ApartmentForm;

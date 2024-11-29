"use client";

import updateApartmentService from "@/lib/services/users/updateApartmentService";
import updatePasswordService from "@/lib/services/users/updatePasswordService";
import { useState } from "react";
import SingleForm from "./SingleForm";

interface FormElements extends HTMLFormControlsCollection {
  val1: HTMLInputElement;
  val2: HTMLInputElement;
}

export interface SettingsFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

const SettingsForms = () => {
  const [passwordError, setPasswordError] = useState<string>("");
  const [apartmentError, setApartmentError] = useState<string>("");

  const handlePasswordChange = async (
    e: React.FormEvent<SettingsFormElements>
  ) => {
    e.preventDefault();
    const newPassword = e.currentTarget.elements.val1.value;
    const newPassword2 = e.currentTarget.elements.val1.value;

    if (!validValues(newPassword, newPassword2)) return;

    try {
      await updatePasswordService(newPassword);
    } catch (error) {
      if (error instanceof Error) {
        setPasswordError(error.message);
      }
    }
  };

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

  const validValues = (val1: string, val2: string): boolean => {
    return !!val1 && !!val2 && val1 === val2;
  };

  return (
    <div className="flex justify-evenly">
      <SingleForm
        setting="password"
        inputType="password"
        handler={handlePasswordChange}
        errorMessage={passwordError}
        errorSetter={setPasswordError}
      />
      <SingleForm
        setting="apartment"
        handler={handleApartmentChange}
        errorMessage={apartmentError}
        errorSetter={setApartmentError}
      />
    </div>
  );
};

export default SettingsForms;

"use client";

import { showError } from "@/lib/utils/showError";
import { useEffect, useState } from "react";
import ApartmentForm from "./ApartmentForm";
import PasswordForm from "./PasswordForm";

interface FormElements extends HTMLFormControlsCollection {
  val1: HTMLInputElement;
  val2: HTMLInputElement;
}

export interface SettingsFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export const validValues = (val1: string, val2: string): boolean => {
  console.log(val1, val2);
  console.log(!!val1);
  console.log(!!val2);
  console.log(val1 === val2);
  return !!val1 && !!val2 && val1 === val2;
};

const SettingsForms = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    showError(setMessage, message);
  }, [setMessage, message]);

  return (
    <div>
      <div className="flex justify-evenly">
        <PasswordForm setMessage={setMessage} />
        <ApartmentForm setMessage={setMessage} />
      </div>
      <span>{message}</span>
    </div>
  );
};

export default SettingsForms;

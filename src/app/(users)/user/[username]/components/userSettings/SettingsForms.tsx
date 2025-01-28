"use client";

import { useDisplayMessage } from "@/components/useDisplayMessage";
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
  const [showMessage, message] = useDisplayMessage();

  return (
    <div className="box-basic mb-8">
      <h2>Settings</h2>
      <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-2">
        <PasswordForm setMessage={showMessage} />
        <ApartmentForm setMessage={showMessage} />
      </div>

      <span className="hidden text-xl empty:hidden sm:block sm:pt-4">
        {message}
      </span>
    </div>
  );
};

export default SettingsForms;

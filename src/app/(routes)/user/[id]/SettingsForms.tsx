"use client";

import updatePasswordService from "@/lib/services/users/updatePasswordService";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface FormElements extends HTMLFormControlsCollection {
  val1: HTMLInputElement;
  val2: HTMLInputElement;
}

interface SettingsFormElemens extends HTMLFormElement {
  readonly elements: FormElements;
}

const SettingsForms = () => {
  const session = useSession();

  const handlePasswordChange = async (
    e: React.FormEvent<SettingsFormElemens>
  ) => {
    e.preventDefault();
    const newPassword = e.currentTarget.elements.val1.value;
    const newPassword2 = e.currentTarget.elements.val1.value;

    console.log(newPassword, newPassword2);

    if (!validValues(newPassword, newPassword2)) return;

    try {
      await updatePasswordService(newPassword);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleApartmentChange = () => {};

  // const validValues = (val1: string, val2: string): boolean => {
  //   return !!val1 && !!val2 && val1 === val2;
  // };

  const validValues = (val1: string, val2: string): boolean => {
    return !!val1 && !!val2 && val1 === val2;
  };

  return (
    <div className="flex justify-evenly">
      <SingleForm
        setting="password"
        inputType="password"
        handler={handlePasswordChange}
      />
      <SingleForm setting="apartment" handler={handleApartmentChange} />
      <div></div>
    </div>
  );
};

const SingleForm = ({
  setting,
  inputType,
  handler,
}: {
  setting: string;
  inputType?: string;
  handler: any;
}) => {
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");

  const fieldsMatch = value1 === value2;
  const inputClass = !fieldsMatch ? "bg-red-200" : "";

  return (
    <div className="basis-0 flex-grow">
      <h3 className="mb-2">Change {setting}</h3>
      <form className="settings-form w-3/4" onSubmit={handler}>
        <div>
          <label>New {setting}</label>
          <input
            name="val1"
            type={inputType || "text"}
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder={`New ${setting}`}
          />
        </div>

        <div>
          <label className="w-fit">New {setting} again</label>
          <input
            name="val2"
            type={inputType || "text"}
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder={`New ${setting}`}
            className={inputClass}
          />
          <span
            className={`text-base text-red-500 ${
              fieldsMatch ? "hidden" : "block"
            }`}
          >
            Fields do not match
          </span>
        </div>
        <button
          className="btn-primary disabled:bg-greenDisabledV"
          disabled={!fieldsMatch}
          type="submit"
        >
          Update {setting}
        </button>
      </form>
    </div>
  );
};

export default SettingsForms;

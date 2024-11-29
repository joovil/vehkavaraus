"use client";

import { useEffect, useState } from "react";
import { SettingsFormElements } from "./SettingsForms";

const SingleForm = ({
  setting,
  inputType,
  handler,
  errorMessage,
  errorSetter,
}: {
  setting: string;
  inputType?: string;
  handler: (e: React.FormEvent<SettingsFormElements>) => Promise<void>;
  errorMessage: string;
  errorSetter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");

  const fieldsMatch = value1 === value2;
  const inputClass = !fieldsMatch || errorMessage ? "bg-red-200" : "";

  useEffect(() => {
    errorSetter(errorMessage);
    setTimeout(() => {
      errorSetter("");
    }, 3000);
  }, [errorMessage, errorSetter]);

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
            className={inputClass}
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
              errorMessage || !fieldsMatch ? "block" : "hidden"
            }`}
          >
            {errorMessage || "Fields do not match"}
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

export default SingleForm;

"use client";

import { showError } from "@/lib/utils/showError";
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
  const inputClass = !fieldsMatch ? "bg-red-200" : "";
  console.log(fieldsMatch);

  useEffect(() => {
    showError(errorSetter, errorMessage);
  }, [errorMessage, errorSetter]);

  return (
    <div className="flex-grow basis-0">
      <form className="flex w-3/4 flex-col gap-2" onSubmit={handler}>
        <h3>Change password</h3>
        <label>New {setting}</label>
        <input
          name="val1"
          type={inputType || "text"}
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          placeholder={`New ${setting}`}
          className={inputClass}
        />

        <label>New {setting} again</label>
        <input
          name="val2"
          type={inputType || "text"}
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          placeholder={`New ${setting}`}
          className={inputClass}
        />
        <button className="btn-primary" disabled={!fieldsMatch}>
          Submit
        </button>
      </form>
      <div className="mt-2 text-lg">
        <div className="text-red-800">{errorMessage}</div>
      </div>
    </div>
  );
};

export default SingleForm;

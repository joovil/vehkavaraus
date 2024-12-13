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
  const inputClass = !fieldsMatch || errorMessage ? "bg-red-200" : "";

  useEffect(() => {
    showError(errorSetter, errorMessage);
  }, [errorMessage, errorSetter]);

  return (
    <div className="basis-0 flex-grow">
      <form className="flex flex-col w-3/4" onSubmit={handler}>
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
        <button className="btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default SingleForm;

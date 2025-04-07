"use client";

import { useDisplayMessage } from "@/components/useDisplayMessage";
import updatePasswordService from "@/lib/services/users/updatePasswordService";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { SettingsFormElements, validValues } from "./SettingsForms";

const PasswordForm = ({
  setMessage,
}: {
  setMessage: (message: string) => void;
}) => {
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [showMobileMessage, setShowMobile] = useState<boolean>(false);

  const [showError, errorMessage] = useDisplayMessage();

  const handlePasswordChange = async (
    e: React.FormEvent<SettingsFormElements>,
  ) => {
    e.preventDefault();

    if (!validValues(password, password2)) {
      showError("Fields must match");
      return;
    }

    try {
      await updatePasswordService(password);

      setMessage("Password changed. Please log back in");
      setShowMobile(true);

      await new Promise((resolve) => setTimeout(resolve, 4000));
      signOut({ callbackUrl: "/login" });
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    }
  };

  const fieldsMatch = password === password2;

  return (
    <div className="flex flex-col text-lg sm:flex-grow">
      {showMobileMessage && (
        <div className="flex flex-wrap gap-x-1 text-xl sm:hidden">
          <span>Password changed.</span>
          <span>Please log back in</span>
        </div>
      )}

      <form
        className="flex w-full flex-col [&>input]:max-w-80"
        onSubmit={handlePasswordChange}
      >
        <h3>Update password</h3>
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"New password"}
          className={`${!fieldsMatch ? "bg-red-200" : ""}`}
        />

        <label>Password again</label>
        <input
          name="val2"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder={"New password"}
          className={!fieldsMatch ? "bg-red-200" : ""}
        />

        <button
          className="btn-primary mt-2"
          disabled={!fieldsMatch}
        >
          Submit
        </button>
      </form>

      <div className="mt-2 text-red-800 empty:hidden">
        <span>{errorMessage}</span>
      </div>
    </div>
  );
};

export default PasswordForm;

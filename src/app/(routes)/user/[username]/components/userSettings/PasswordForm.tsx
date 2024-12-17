"use client";

import updatePasswordService from "@/lib/services/users/updatePasswordService";
import { useState } from "react";
import { SettingsFormElements, validValues } from "./SettingsForms";
import SingleForm from "./SingleForm";

const PasswordForm = () => {
  const [passwordError, setPasswordError] = useState<string>("");

  const handlePasswordChange = async (
    e: React.FormEvent<SettingsFormElements>,
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

  return (
    <SingleForm
      setting="password"
      inputType="password"
      handler={handlePasswordChange}
      errorMessage={passwordError}
      errorSetter={setPasswordError}
    />
  );
};

export default PasswordForm;

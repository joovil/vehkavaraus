"use client";

import updatePasswordService from "@/lib/services/users/updatePasswordService";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { SettingsFormElements, validValues } from "./SettingsForms";
import SingleForm from "./SingleForm";

const PasswordForm = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [passwordError, setPasswordError] = useState<string>("");

  const handlePasswordChange = async (
    e: React.FormEvent<SettingsFormElements>,
  ) => {
    e.preventDefault();

    const newPassword = e.currentTarget.elements.val1.value;
    const newPassword2 = e.currentTarget.elements.val2.value;

    if (!validValues(newPassword, newPassword2)) {
      setPasswordError("Fields must match");
      return;
    }

    const res = await updatePasswordService(newPassword);

    if (res.status !== 200) {
      const data = await res.json();
      setPasswordError(data.error);
    }

    setMessage("Password changed. Please log back in");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    signOut({ callbackUrl: "/login" });
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

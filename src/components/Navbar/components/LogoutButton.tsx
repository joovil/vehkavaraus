"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export const LogoutButton = () => {
  const [confirm, setConfirm] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setConfirm((c) => !c);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div>
      {!confirm ? (
        <button onClick={handleClick}>Log out</button>
      ) : (
        <div className="flex gap-3">
          <button onClick={() => setConfirm((c) => !c)}>Cancel</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
    </div>
  );
};

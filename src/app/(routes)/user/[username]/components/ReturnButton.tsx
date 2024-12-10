"use client";

import { useState } from "react";

const ClientButton = ({ children }: { children: React.ReactNode }) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleClick = () => {
    console.log("hello");
    setDisabled(true);
  };

  return (
    <>
      <button
        className="btn-primary disabled:bg-greenDisabledV"
        disabled={disabled}
        onClick={handleClick}
      >
        {children}
      </button>
    </>
  );
};

export default ClientButton;

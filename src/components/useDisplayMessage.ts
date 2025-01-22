import { useRef, useState } from "react";

export const useDisplayMessage = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const displayMessage = (message: string) => {
    setErrorMessage(message);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  return [displayMessage, errorMessage] as const;
};

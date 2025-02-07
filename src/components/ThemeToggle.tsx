"use client";

import { useEffect, useState } from "react";

// NOTE: Not implemented
export const ThemeToggle = ({ initialTheme }: { initialTheme: string }) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    if (theme) {
      document.cookie = `theme=${theme};path=/;`;
      const htmlElement = document.querySelector("html");
      if (htmlElement) {
        htmlElement.setAttribute("data-theme", theme);
      }
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle Theme
      {" " + theme}
    </button>
  );
};

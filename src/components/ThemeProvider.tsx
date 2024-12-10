"use client";

import { Fragment, useEffect, useState } from "react";

// FIXME: Code ain't great
const getTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeProvider = () => {
  const theme = getTheme();

  useEffect(() => {
    document.body.classList.add(theme);
  }, [theme]);

  return <Fragment></Fragment>;
};

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface ThemeSwitchProps extends ButtonAttributes {
  children?: React.ReactNode;
}

export const ThemeSwitch = ({ children, ...attributes }: ThemeSwitchProps) => {
  const [theme, setTheme] = useState(getTheme());

  const switchTheme = () => {
    if (theme === "light") {
      document.body.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      return;
    }

    setTheme("light");
    localStorage.setItem("theme", "light");
    document.body.classList.replace("dark", "light");
  };

  return (
    <button {...attributes} onClick={switchTheme}>
      {children}
    </button>
  );
};

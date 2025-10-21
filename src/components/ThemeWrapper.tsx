"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  darkTheme: boolean;
  handleToggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeWrapper");
  return ctx;
}

type Props = {
  children: React.ReactNode;
};

function ThemeWrapper({ children }: Props) {
  const [darkTheme, setDarkTheme] = useState(false);

  function handleToggleTheme() {
    setDarkTheme((prev) => !prev);
  }

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkTheme ? "dark" : "light"
    );
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, handleToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeWrapper;

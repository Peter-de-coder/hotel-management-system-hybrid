import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const DashboardContext = createContext(undefined);

export const DashboardContextProvider = ({ children }) => {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  function handleToggleNav() {
    setNavOpen((prev) => !prev);
  }

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  return (
    <DashboardContext.Provider value={{ navOpen, setNavOpen, handleToggleNav }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboardContext must be used inside DashboardContextProvider");
  } else {
    return ctx;
  }
};

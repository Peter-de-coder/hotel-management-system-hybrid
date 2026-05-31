import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const AppContext = createContext(undefined);

export const AppContextProvider = ({ children }) => {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  
  function handleToggleNav() {
    setNavOpen((prev) => !prev);
  }

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  return (
    <AppContext.Provider value={{ navOpen, setNavOpen, handleToggleNav }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used inside AppContextProvider");
  } else {
    return ctx;
  }
};

import { AuthReducer } from "@/context/AuthReducer";
import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // persist token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

import React from "react";
import { AuthProvider } from "@/hooks/AuthContext";

const AuthLayout = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthLayout;

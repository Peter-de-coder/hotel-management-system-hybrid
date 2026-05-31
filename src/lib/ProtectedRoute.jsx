// utils/ProtectedRoute.tsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/auth/signin"); // redirect to login if no token
    }
  }, [router]);
};

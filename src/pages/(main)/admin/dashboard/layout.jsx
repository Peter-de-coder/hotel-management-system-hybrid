import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { DashboardContextProvider } from "@/hooks/DashboardContext";
import DashboardShell from "./DashboardShell";

const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/auth/signin");
    }
  }, [navigate]);

  return (
    <DashboardContextProvider>
      <DashboardShell>
        <Outlet />
      </DashboardShell>
    </DashboardContextProvider>
  );
};

export default DashboardLayout;

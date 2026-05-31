import React from 'react';
import { useDashboardContext } from "@/hooks/DashboardContext";
import Sidebar from "./_component/Sidebar";

const DashboardShell = ({ children }) => {
    const { setNavOpen, navOpen } = useDashboardContext();

    return (
        <section
            className="bg-bgDashboard h-screen grid not-sm:grid-cols-1 sm:grid-cols-[10fr_10fr] md:grid-cols-[7fr_13fr] lg:grid-cols-[5fr_15fr] xl:grid-cols-[3fr_17fr] overflow-hidden">
            {/* Sidebar usually stays fixed or has its own scroll */}
            <Sidebar />

            {/* Main content area scrolls independently */}
            <main className="overflow-y-auto">
                {children}
            </main>
        </section>
    );
};

export default DashboardShell;

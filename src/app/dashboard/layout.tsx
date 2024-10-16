import Header from "@/components/dashboard/Header.component";
import Sidebar from "@/components/dashboard/Sidebar.component";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import React, { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Account",
};

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="flex items-stretch h-full relative">
      {/* Sidebar */}
      <div className="flex-0 h-full hidden lg:block">
        <Sidebar />
      </div>
      {/* Header + tab */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <div className="flex-shrink-0">
          <Header />
        </div>
        {/* Tab */}
        <div className="flex-grow overflow-y-auto p-6">{children}</div>
      </div>
      <NextTopLoader color="#007AFF" />
    </main>
  );
};

export default DashboardLayout;

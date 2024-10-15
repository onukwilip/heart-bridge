import Header from "@/components/dashboard/Header.component";
import Sidebar from "@/components/dashboard/Sidebar.component";
import { Metadata } from "next";
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
      <div className="flex-1 h-full">
        {/* Header */}
        <div className="">
          <Header />
        </div>
        {/* Tab */}
        <div>{children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;

import Header from "@/components/dashboard/Header.component";
import PagesWrapper from "@/components/dashboard/PagesWrapper.component";
import Sidebar from "@/components/dashboard/Sidebar.component";
import SideBarContextProvider from "@/contexts/SideBar.context";
import UserContextProvider from "@/contexts/User.context";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import React, { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Account",
};

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UserContextProvider>
      <SideBarContextProvider>
        <main className="flex items-stretch h-full relative w-screen overflow-x-hidden">
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
            <div className="relative flex-grow overflow-y-auto p-6 box-border">
              <PagesWrapper>{children}</PagesWrapper>{" "}
            </div>
          </div>
          <NextTopLoader color="#007AFF" />
        </main>
      </SideBarContextProvider>
    </UserContextProvider>
  );
};

export default DashboardLayout;

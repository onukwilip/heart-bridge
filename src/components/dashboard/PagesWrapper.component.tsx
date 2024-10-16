"use client";
import { useSideBarContext } from "@/contexts/SideBar.context";
import { AnimatePresence } from "framer";
import React, { FC, ReactNode } from "react";
import MobileSideBar from "./MobileSideBar.component";

/**
 * * Renders the mobile menu and the children - pages of the layout
 * @param param0 The object containing the children props
 * @returns The pages of this layount compoents
 */
const PagesWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { expand } = useSideBarContext();

  return (
    <>
      {children}
      <AnimatePresence>{expand && <MobileSideBar />}</AnimatePresence>
    </>
  );
};

export default PagesWrapper;

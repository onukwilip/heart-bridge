"use client";
import React, { useState } from "react";
import LogoText from "../Logo.component";
import { MenuClass } from "@/utils/dashboard/classes.utils";
import Menu from "./Menu.component";
import { logout } from "@/utils/appwrite/auth.utils";
import { TAB_PAGE_NAMES } from "@/utils/types";
import { useSideBarContext } from "@/contexts/SideBar.context";

const menus: MenuClass[] = [
  new MenuClass(TAB_PAGE_NAMES.DASHBOARD, "/dashboard", "fas fa-house"),
  new MenuClass(
    TAB_PAGE_NAMES.PROJECTS,
    "/dashboard/projects",
    "fas fa-folder"
  ),
  new MenuClass(
    TAB_PAGE_NAMES.DONATIONS,
    "/dashboard/donations",
    "fas fa-hand-holding-dollar"
  ),
  new MenuClass(
    TAB_PAGE_NAMES.VISITATIONS,
    "/dashboard/visitations",
    "fas fa-location-dot"
  ),
  new MenuClass(TAB_PAGE_NAMES.CALLS, "/dashboard/calls", "fas fa-mobile"),
  new MenuClass(TAB_PAGE_NAMES.ACCOUNT, "/dashboard/account", "fas fa-user"),
];

const Sidebar = () => {
  const { expand, setExpand } = useSideBarContext();

  return (
    <div
      className={`flex flex-col justify-between gap-6 py-8 border-r border-weak-grey h-full transition ${
        expand ? "w-[300px]" : "w-fit"
      }`}
    >
      {/* Toogle + Logo + Menu */}
      <div className="flex flex-col gap-6">
        {/* Toogle */}
        <div
          className={`flex cursor-pointer px-6 box-border ${
            expand ? "justify-end" : "justify-center"
          }`}
        >
          <i
            className={expand ? "fas fa-xmark" : "fas fa-bars"}
            onClick={() => setExpand((prev) => !prev)}
          ></i>
        </div>
        {/* Logo */}
        <div className="flex px-6 box-border">
          <LogoText enableExpand expand={expand} />
        </div>
        {/* Menu */}
        <div className="flex flex-col gap-3">
          {menus.map((menu) => (
            //   Each menu
            <Menu menu={{ ...menu }} key={menu.name} expand={expand} />
          ))}
        </div>
      </div>
      {/* Log out */}
      <div>
        <Menu
          menu={{
            name: "logout",
            link: "/auth/login",
            icon: "fas fa-right-from-bracket",
          }}
          expand={expand}
          linkClassName="text-red-500 hover:text-red-500 hover:before:bg-red-500 hover:bg-weak-red"
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default Sidebar;

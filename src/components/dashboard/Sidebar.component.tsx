"use client";
import React, { useState } from "react";
import LogoText from "../logo.component";
import { MenuClass } from "@/utils/dashboard/classes";
import Menu from "./Menu.component";
import { logout } from "@/utils/appwrite/auth.utils";

const menus: MenuClass[] = [
  new MenuClass("dashboard", "/dashboard", "fas fa-house"),
  new MenuClass("projects", "/dashboard/projects", "fas fa-folder"),
  new MenuClass(
    "donations",
    "/dashboard/donations",
    "fas fa-hand-holding-dollar"
  ),
  new MenuClass("visitations", "/dashboard/visitations", "fas fa-location-dot"),
  new MenuClass("calls", "/dashboard/calls", "fas fa-mobile"),
  new MenuClass("account", "/dashboard/account", "fas fa-user"),
];

const Sidebar = () => {
  const [expand, setExpand] = useState(false);

  return (
    <div
      className={`flex flex-col justify-between gap-6 py-8 border-r border-[#FFFFFF1A] h-full transition ${
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

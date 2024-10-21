"use client";
import React, { useState } from "react";
import LogoText from "../Logo.component";
import { MenuClass } from "@/utils/dashboard/classes.utils";
import Menu from "./Menu.component";
import { logout } from "@/utils/appwrite/auth.utils";
import { TAB_PAGE_NAMES } from "@/utils/types";
import { useSideBarContext } from "@/contexts/SideBar.context";
import { useUserContext } from "@/contexts/User.context";
import { Skeleton } from "@mui/material";

const menus: MenuClass[] = [
  new MenuClass(TAB_PAGE_NAMES.DASHBOARD, "/dashboard", "fas fa-house"),
  new MenuClass(
    TAB_PAGE_NAMES.PROJECTS,
    "/dashboard/projects",
    "fas fa-folder",
    "orphanage"
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
  const { user, fetch_user_state } = useUserContext();

  return (
    <div
      className={`flex flex-col justify-between gap-6 py-8 border-r border-weak-grey h-full transition ${
        expand ? "w-[300px]" : "w-fit"
      }`}
    >
      {/* Toogle + Logo + Menu */}
      <div className="flex flex-col gap-6">
        {/* Toogle */}
        {!fetch_user_state.loading && (
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
        )}
        {/* Logo */}
        <div className="flex px-6 box-border">
          <LogoText enableExpand expand={expand} />
        </div>
        {/* Menu */}
        <div className="flex flex-col gap-3">
          {menus.map((menu) => (
            //   Each menu
            <>
              {fetch_user_state.loading ? (
                <div className="w-full flex justify-center">
                  <Skeleton
                    variant="circular"
                    animation="pulse"
                    width={30}
                    height={30}
                    className="!bg-primary-grey rounded-full"
                  />
                </div>
              ) : (
                <>
                  {menu.role ? (
                    menu.role === user?.prefs?.account_type && (
                      <Menu
                        menu={{ ...menu }}
                        key={menu.name}
                        expand={expand}
                      />
                    )
                  ) : (
                    <Menu menu={{ ...menu }} key={menu.name} expand={expand} />
                  )}
                </>
              )}
            </>
          ))}
        </div>
      </div>
      {/* Log out */}
      {fetch_user_state.loading ? (
        <div className="w-full flex justify-center">
          <Skeleton
            variant="circular"
            animation="pulse"
            width={30}
            height={30}
            className="!bg-primary-grey rounded-full"
          />
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Sidebar;

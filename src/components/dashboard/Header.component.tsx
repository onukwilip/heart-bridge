"use client";
import usePageName from "@/hooks/usePageName.hook";
import { TAB_PAGE_NAMES } from "@/utils/types";
import React, { useState } from "react";
import { InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { RoundedFormControl } from "../atoms/RoundedFormControl.component";
import Image from "next/image";
import dummy_image from "@/images/dummy-profile-pic.png";
import { useSideBarContext } from "@/contexts/SideBar.context";
import { useUserContext } from "@/contexts/User.context";
import HeaderNotification from "../notifications/HeaderNotification.component";

const Header = () => {
  const { current_page_name, segments } = usePageName();
  const { user } = useUserContext();
  const { expand, setExpand } = useSideBarContext();
  const current_page_exists = [
    TAB_PAGE_NAMES.DASHBOARD,
    TAB_PAGE_NAMES.PROJECTS,
    TAB_PAGE_NAMES.VISITATIONS,
    TAB_PAGE_NAMES.CALLS,
    TAB_PAGE_NAMES.DONATIONS,
    TAB_PAGE_NAMES.ACCOUNT,
  ].includes(current_page_name as TAB_PAGE_NAMES)
    ? current_page_name
    : false;

  return (
    <>
      <div className="w-full py-4 px-6 box-border sm:px-10 flex gap-4 items-center justify-between border-b border-weak-grey relative">
        {/* Page name + description + menu icon */}
        <div className="flex gap-4 items-center">
          {/* Menu icon */}
          <i
            className={`fas ${
              expand ? "fa-xmark" : "fa-bars"
            } inline-block lg:!hidden text-primary-grey`}
            onClick={() => setExpand((prev) => !prev)}
          ></i>
          <div className="flex flex-col">
            {/* Page name */}
            <span className="capitalize text-primary font-bold text-md">
              {current_page_exists
                ? current_page_name
                : segments[segments.length - 2]}
            </span>
            {/* Description */}
            <span className="text-xs">
              {(current_page_exists || segments[segments.length - 2]) ===
              TAB_PAGE_NAMES.DASHBOARD
                ? "Overview of Orphanage stats"
                : (current_page_exists || segments[segments.length - 2]) ===
                  TAB_PAGE_NAMES.PROJECTS
                ? "Keep track of all active and past projects here."
                : (current_page_exists || segments[segments.length - 2]) ===
                  TAB_PAGE_NAMES.VISITATIONS
                ? "Manage visitations"
                : (current_page_exists || segments[segments.length - 2]) ===
                  TAB_PAGE_NAMES.CALLS
                ? "Manage calls"
                : (current_page_exists || segments[segments.length - 2]) ===
                  TAB_PAGE_NAMES.DONATIONS
                ? "Here are your most recent donations across all projects."
                : (current_page_exists || segments[segments.length - 2]) ===
                  TAB_PAGE_NAMES.ACCOUNT
                ? "Manage your account information here."
                : "Overview of Orphanage stats"}
            </span>
          </div>
        </div>
        {/* Right side */}
        <div className="flex gap-6 items-center">
          {/* Search */}
          <RoundedFormControl
            variant="outlined"
            className="w-[300px] !hidden md:!flex rounded-xl"
          >
            <InputLabel htmlFor="password">Search</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <i
                    className={`fas fa-magnifying-glass text-2xl text-primary-grey`}
                  ></i>
                </InputAdornment>
              }
              label="Password"
            />
          </RoundedFormControl>
          <i
            className={`fas fa-magnifying-glass inline-block md:hidden text-primary-grey hover:text-primary-grey-dark`}
          ></i>

          {/* Notification */}
          <HeaderNotification />
          {/* Profile */}
          <div className="flex gap-3 items-center">
            {/* Image container */}
            <div className="rounded-full overflow-x-hidden overflow-y-hidden w-[40px] h-[40px] md:w-[60px]">
              <Image
                width={40}
                height={40}
                src={user?.prefs?.image || dummy_image.src}
                alt={user?.prefs?.firstname || ""}
                className=" object-cover max-w-[60px] w-full h-full"
              />
            </div>
            <div className="hidden md:flex flex-col capitalize text-sm w-full">
              <span className="font-bold text-white w-full">
                {user?.prefs?.account_type === "donor"
                  ? user?.prefs?.firstname
                  : user?.prefs?.orphanage_name}
              </span>
              <span>{user?.prefs?.account_type}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

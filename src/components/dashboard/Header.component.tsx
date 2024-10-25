"use client";
import usePageName from "@/hooks/usePageName.hook";
import { TAB_PAGE_NAMES, TUser } from "@/utils/types";
import React from "react";
import { useSideBarContext } from "@/contexts/SideBar.context";
import { useUserContext } from "@/contexts/User.context";
import HeaderNotification from "../notifications/HeaderNotification.component";
import SearchBar from "../search/SearchBar.component";
import ProfileCard from "../atoms/ProfileCard.component";
import Link from "next/link";
import { Skeleton } from "@mui/material";

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
            <span className="hidden xs:inline text-xs">
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
          <SearchBar />
          {/* Notification */}
          <HeaderNotification />
          {/* View public profile */}
          <Link
            href={`/orphanages/${user?.$id}`}
            title="View public profile"
            target="_blank"
          >
            <i className="fa-regular fa-eye transition duration-200 hover:text-primary-grey-dark cursor-pointer"></i>
          </Link>
          {/* Profile */}
          {user ? (
            <ProfileCard user={user?.prefs as TUser} />
          ) : (
            <div className="flex items-center gap-2">
              <Skeleton
                variant="circular"
                className="!bg-primary-grey"
                animation="pulse"
                width={40}
                height={40}
              />
              <div className="flex flex-col">
                <Skeleton
                  variant="text"
                  className="!bg-primary-grey"
                  animation="pulse"
                  width={70}
                  sx={{ fontSize: "11px" }}
                />
                <Skeleton
                  variant="text"
                  className="!bg-primary-grey"
                  animation="pulse"
                  width={40}
                  sx={{ fontSize: "11px" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

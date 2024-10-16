"use client";
import usePageName from "@/hooks/usePageName.hook";
import { TAB_PAGE_NAMES, TUser } from "@/utils/types";
import React, { use, useEffect, useState } from "react";
import { InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { RoundedFormControl } from "../atoms/RoundedFormControl.component";
import Image from "next/image";
import { Models } from "appwrite";
import { get_current_user } from "@/utils/appwrite/auth.utils";
import dummy_image from "@/images/dummy-profile-pic.png";

const Header = () => {
  const current_page_name = usePageName();
  const [user, setuser] = useState<Models.User<TUser>>();

  /**
   * * Get's the details of the signed in user
   */
  const get_user = async () => {
    const returned_user = await get_current_user();

    setuser(returned_user);
  };

  useEffect(() => {
    get_user();
  }, []);

  return (
    <div className="py-4 px-10 flex justify-between border-b border-[#FFFFFF1A]">
      {/* Page name + description */}
      <div className="flex flex-col">
        {/* Page name */}
        <span className="capitalize text-primary text-lg">
          {current_page_name}
        </span>
        <span className="text-sm">
          {current_page_name === TAB_PAGE_NAMES.DASHBOARD
            ? "Overview of Orphanage stats"
            : current_page_name === TAB_PAGE_NAMES.PROJECTS
            ? "Keep track of all active and past projects here."
            : TAB_PAGE_NAMES.VISITATIONS
            ? "Manage visitations"
            : TAB_PAGE_NAMES.DONATIONS
            ? "Here are your most recent donations across all projects."
            : TAB_PAGE_NAMES.ACCOUNT
            ? "Manage your account information here."
            : "Overview of Orphanage stats"}
        </span>
      </div>
      {/* Right side */}
      <div className="flex gap-6 items-center">
        {/* Search */}
        <RoundedFormControl variant="outlined" className="w-[400px] rounded-xl">
          <InputLabel htmlFor="password">Search</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">
                <i className={`fas fa-magnifying-glass text-primary-grey`}></i>
              </InputAdornment>
            }
            label="Password"
          />
        </RoundedFormControl>
        {/* Notification */}
        <div>
          <i className="fa-regular fa-bell text-2xl transition duration-200 hover:text-primary cursor-pointer"></i>
        </div>
        {/* Profile */}
        <div className="flex gap-3 items-center">
          {/* Image container */}
          <div className="rounded-full overflow-x-hidden overflow-y-hidden w-[60px] h-[40px]">
            <Image
              width={40}
              height={40}
              src={user?.prefs?.image || dummy_image.src}
              alt={user?.prefs?.firstname || ""}
              className=" object-cover max-w-[60px] w-full h-full"
            />
          </div>
          <div className="flex flex-col capitalize text-sm w-full">
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
  );
};

export default Header;

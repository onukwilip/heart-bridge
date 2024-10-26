"use client";
import React, { useEffect, useState } from "react";
import LogoText from "../Logo.component";
import SearchBar from "../search/SearchBar.component";
import { Models } from "appwrite";
import { TUser } from "@/utils/types";
import { get_current_user } from "@/utils/appwrite/auth.utils";
import useFetch from "@/hooks/useFetch.hook";
import { Skeleton } from "@mui/material";
import ProfileCard from "../atoms/ProfileCard.component";
import Button from "../atoms/Button.component";
import { useRouter } from "next/navigation";

const Header = () => {
  const [user, setUser] = useState<Models.User<TUser>>();
  const fetch_user_state = useFetch({ loading: true });
  const router = useRouter();

  /**
   * * Retrieves the user details from the cookies and populates the user state with it
   */
  const populate_user = async () => {
    // * Indicate that the user details is being retrieved
    fetch_user_state.display_loading();

    // * Retrieve user from Appwrite API
    const user = await get_current_user();

    // * If user not found, display an error message
    if (!user) {
      return fetch_user_state.display_error("Error");
    }

    // * Set the user in the state and display a success message
    setUser(user);
    fetch_user_state.display_success("Success");
  };

  useEffect(() => {
    populate_user();
  }, []);

  return (
    <div className="w-full py-4 px-6 box-border sm:px-10 flex gap-4 items-center justify-between border-b border-weak-grey sticky top-0 left-0 bg-[#0a0a0a] z-30">
      {/* Logo section */}
      <div className="flex gap-4 items-center">
        <LogoText reduceOnSmallScreen />
      </div>
      {/* Right side */}
      <div className="flex gap-6 items-center">
        {/* Search */}
        <SearchBar />
        {/* Profile OR Login button */}
        <div className="flex gap-3 items-center">
          {fetch_user_state.loading ? (
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
          ) : user ? (
            <ProfileCard user={user.prefs} />
          ) : (
            <Button
              variant="outlined"
              className="h-[30px]"
              outlined
              onClick={() => router.push("/auth/login")}
            >
              <span className="!text-2xs">Login</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

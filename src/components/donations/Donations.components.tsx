"use client";
import { fakeDonations } from "@/utils/constants.utils";
import { formatAmount } from "@/utils/helpers/formatAmount";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import SeeAll from "../dashboard/SeeAll.component";
import { Avatar } from "@mui/material";
import DonorTableCard from "./DonorTableCard.component";
import { TDonation } from "@/utils/types";
import useFetch from "@/hooks/useFetch.hook";
import { get_donations } from "@/actions/donation.action";
import { useUserContext } from "@/contexts/User.context";
import Error404 from "../atoms/Error404.component";
import Donation from "./Donation.component";
import DonationLoader from "./DonationLoader.component";

const Donations: FC<{
  className?: string;
  listClassName?: string;
  displayLink?: boolean;
}> = ({ className, listClassName, displayLink }) => {
  const [donations, setDonations] = useState<TDonation[]>([]);
  const { user, fetch_user_state } = useUserContext();
  const fetch_donations_state = useFetch({ loading: true });

  /**
   * * Function responsible for retrieving project details
   */
  const get_donations_handler = async () => {
    try {
      // * Display loading indicator
      fetch_donations_state.display_loading();

      // * Retrieve the project details
      const donations = await get_donations(
        user?.prefs?.account_type || "orphanage",
        user?.$id || ""
      );

      // * Add the result to the list of donations
      setDonations(donations);

      // * Display success message
      fetch_donations_state.display_success("Project retrieved successfully");
    } catch (error) {
      console.error(error);
      // * Display error message
      fetch_donations_state.display_error((error as any).message || error);
    }
  };

  useEffect(() => {
    if (user) get_donations_handler();
  }, [fetch_user_state.loading]);

  return (
    <div className={`flex flex-col gap-y-5 w-full items-center ${className}`}>
      <div className="flex justify-between items-center max-w-[1000px] w-full">
        <h3 className="font-bold text-xl text-white">Donations</h3>
        {displayLink && <SeeAll link="/dashboard/donations" />}
      </div>

      {/* Table */}
      {fetch_donations_state.loading ? (
        <DonationLoader
          className={`w-full !max-w-[1000px] ${listClassName || ""}`}
        />
      ) : donations.length > 0 ? (
        <div
          className={`flex flex-col gap-3 w-full items-center ${
            listClassName || ""
          }`}
        >
          {donations.map((donation) => (
            <Donation
              donation={donation}
              account_type={user?.prefs.account_type || "orphanage"}
              key={donation.$id}
              className="!max-w-[1000px]"
            />
          ))}
        </div>
      ) : (
        <>
          <Error404 msg="No donations made to any of your projects" />
        </>
      )}
    </div>
  );
};

export default Donations;

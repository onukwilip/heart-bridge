import { Donation, TDonation, TUser } from "@/utils/types";
import { Avatar } from "@mui/material";
import React from "react";

const DonorTableCard = ({ donation }: { donation: TDonation }) => {
  return (
    <div className="flex gap-x-2 items-center">
      <Avatar src="/images/avatar.png" />
      {donation.donor
        ? `${(donation.donor as TUser).firstname} ${
            (donation.donor as TUser).lastname
          }`
        : `An anonymous donor`}
    </div>
  );
};

export default DonorTableCard;

import { Donation } from "@/utils/types";
import { Avatar } from "@mui/material";
import React from "react";

const DonorTableCard = ({ donation }: { donation: Donation }) => {
  return (
    <div className="flex gap-x-2 items-center">
      <Avatar src="/images/avatar.png" />
      {donation.donor}
    </div>
  );
};

export default DonorTableCard;

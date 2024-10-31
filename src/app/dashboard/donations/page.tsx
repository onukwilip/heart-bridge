import DonationsComponent from "@/components/donations/Donations.components";
import React from "react";

const Donations = () => {
  return (
    <div className="flex flex-col space-y-10">
      {/* Title */}
      <h1 className="text-white text-2xl font-bold">Donations</h1>
      {/* Dontaions Table */}
      <DonationsComponent />
    </div>
  );
};

export default Donations;

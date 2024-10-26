import DonationsTable from "@/components/donations/DonationsTable.components";
import React from "react";

const Donations = () => {
  return (
    <div className="flex flex-col space-y-10">
      {/* Title */}
      <h1 className="text-white text-2xl font-bold">Donations</h1>

      {/* Dontaions Table */}
      <DonationsTable />
    </div>
  );
};

export default Donations;

import DonationsTable from "@/components/donations/DonationsTable.components";
import RouteProtector from "@/components/RouteProtector.component";
import React from "react";

const Donations = () => {
  return (
    <RouteProtector role="orphanage">
      <div className="flex flex-col space-y-10">
        {/* Title */}
        <h1 className="text-white text-2xl font-bold">Donations</h1>

        {/* Dontaions Table */}
        <DonationsTable />
      </div>
    </RouteProtector>
  );
};

export default Donations;

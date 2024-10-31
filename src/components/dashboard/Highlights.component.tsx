import React from "react";
import RecentDonations from "./RecentDonations.component";
import UpcomingVisitations from "./UpcomingVisitations.component";
import Donations from "../donations/Donations.components";

const Highlights = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-10">
      <Donations listClassName="max-h-[300px] overflow-y-auto" displayLink />
      <UpcomingVisitations />
    </div>
  );
};

export default Highlights;

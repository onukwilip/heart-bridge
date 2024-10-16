import React from "react";
import RecentDonations from "./RecentDonations.component";
import UpcomingVisitations from "./UpcomingVisitations.component";

const Highlights = () => {
  return (
    <div className="flex w-full gap-x-10 justify-between ">
      <RecentDonations />
      <UpcomingVisitations />
    </div>
  );
};

export default Highlights;

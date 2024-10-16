import React from "react";
import RecentDonations from "./RecentDonations";
import UpcomingVisitations from "./UpcomingVisitations";

const Highlights = () => {
  return (
    <div className="flex w-full gap-x-10 justify-between ">
      <RecentDonations />
      <UpcomingVisitations />
    </div>
  );
};

export default Highlights;

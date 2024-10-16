import React from "react";
import RecentDonations from "./RecentDonations.component";
import UpcomingVisitations from "./UpcomingVisitations.component";

const Highlights = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-10">
      <RecentDonations />
      <UpcomingVisitations />
    </div>
  );
};

export default Highlights;

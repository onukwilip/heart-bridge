import React from "react";
import WelcomeCard from "../../components/dashboard/WelcomeCard.component";
import SummaryRow from "../../components/dashboard/SummaryRow.component";
import Highlights from "../../components/dashboard/Highlights.component";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col space-y-14 w-full">
      {/* Welcome card */}
      <WelcomeCard />
      {/* Summary Row */}
      <SummaryRow />
      {/* HighLights Donations + Visitations */}
      <Highlights />
    </div>
  );
};

export default Dashboard;

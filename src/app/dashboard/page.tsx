import React from "react";
import WelcomeCard from "./_components/WelcomeCard";
import SummaryRow from "./_components/SummaryRow";
import Highlights from "./_components/Highlights";

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

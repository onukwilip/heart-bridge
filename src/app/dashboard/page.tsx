import React from "react";
import WelcomeCard from "./_components/WelcomeCard";
import SummaryRow from "./_components/SummaryRow";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col space-y-10 w-full">
      {/* Welcome card */}
      <WelcomeCard />

      {/* Summary Row */}
      <SummaryRow />
    </div>
  );
};

export default Dashboard;

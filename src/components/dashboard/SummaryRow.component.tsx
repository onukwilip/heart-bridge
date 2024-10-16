import { summaries } from "@/utils/constants";
import React from "react";
import SummaryCard from "./SummaryCard.component";

const SummaryRow: React.FC = () => {
  return (
    <div
      // className="flex items-center flex-1 justify-between"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {summaries.map((summary) => (
        <SummaryCard key={summary.title} summary={summary} />
      ))}
    </div>
  );
};

export default SummaryRow;

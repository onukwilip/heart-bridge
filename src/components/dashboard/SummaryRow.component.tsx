import { summaries } from "@/utils/constants";
import React from "react";
import SummaryCard from "./SummaryCard.component";

const SummaryRow: React.FC = () => {
  return (
    <div className="flex  items-center flex-1  justify-between">
      {summaries.map((summary, index) => (
        <SummaryCard key={summary.title} summary={summary} />
      ))}
    </div>
  );
};

export default SummaryRow;

import { Summary } from "@/utils/types";
import Image from "next/image";
import React from "react";

interface SummaryCardProps {
  summary: Summary;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
  return (
    <div
      className={`flex min-w-[270px] w-full gap-y-2 bg-white/20 rounded-xl p-4 flex-col justify-between items-start border-b-2 ${
        borderColorClasses[summary.color]
      }`}
    >
      <Image src={summary.icon} alt={summary.title} />
      <div className="flex text-white  flex-col gap-y-2 items-start">
        <p className=" text-sm">{summary.title} </p>
        <p className="text-xl font-bold">
          {summary.value}{" "}
          {summary.title.includes("Dona")
            ? ""
            : summary.title.includes("Project")
            ? "projects"
            : summary.title.includes("Visit")
            ? "visitations"
            : "calls"}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;

const borderColorClasses: Record<string, string> = {
  "border-primary": "border-primary",
  "border-secondary": "border-secondary",
  "border-golden": "border-golden",
  "border-hot-red": "border-hot-red",
};

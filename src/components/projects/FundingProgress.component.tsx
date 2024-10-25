import { TProject } from "@/utils/types";
import { format_currency } from "@/utils/utils";
import React, { FC } from "react";

const FundingProgress: FC<{
  project: TProject;
  full_width?: boolean;
  title_className?: string;
}> = ({ project, full_width, title_className }) => {
  const progress_percentage =
    ((Number(project?.current_amount) || 0) / (Number(project?.goal) || 0)) *
    100;

  return (
    <div className="flex gap-4 items-center text-sm">
      <span className={`text-nowrap ${title_className || ""}`}>
        Funding progress:
      </span>
      {/* Progress bar container */}
      <div
        className={`${
          full_width ? "w-full" : "w-[200px]"
        } h-[30px] bg-weak-grey rounded-md overflow-hidden flex justify-center items-center relative pointer-events-none`}
      >
        {/* Progress bar */}
        <div
          style={{ width: `${progress_percentage}%` }}
          className={`h-full absolute top-0 left-0 z-10 ${
            progress_percentage <= 50
              ? "!bg-primary-grey"
              : progress_percentage <= 75
              ? "!bg-yellow-300/30"
              : progress_percentage <= 100
              ? "!bg-green-400/30"
              : "!bg-primary-grey"
          }`}
        ></div>
        {/* Fraction */}
        <div className="">
          {format_currency(project?.current_amount || 0)}{" "}
          <span className="text-lg">/</span>
          {format_currency(project?.goal || 0)}
        </div>
      </div>
    </div>
  );
};

export default FundingProgress;

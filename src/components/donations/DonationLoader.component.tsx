import { Skeleton } from "@mui/material";
import React, { FC } from "react";

const DonationLoader: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex flex-col gap-3 ${className || ""}`}>
      {[1, 2, 3, 4, 5].map((_) => (
        <div
          className={`flex flex-col xs:flex-row xs:items-center gap-2 p-3 rounded-md border border-weak-grey`}
        >
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
            <Skeleton
              variant="circular"
              className="w-[70px] h-[40px] !bg-primary-grey"
              width={70}
              height={70}
              animation="pulse"
            />
          </div>
          <div className="flex flex-col gap-3 gap-y-1 w-full">
            {/* Name */}
            <Skeleton
              variant="text"
              className="w-full max-w-[300px] !bg-primary-grey"
              // width={70}
              animation="pulse"
            />
            {/* Amount + date */}
            <div className="flex gap-x-3 gap-y-1 flex-wrap">
              {/* Amount */}
              <Skeleton
                variant="text"
                className="w-[100px] !bg-primary-grey"
                // width={70}
                animation="pulse"
              />
              {/* Date */}
              <Skeleton
                variant="text"
                className="w-[150px] !bg-primary-grey"
                // width={70}
                animation="pulse"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonationLoader;

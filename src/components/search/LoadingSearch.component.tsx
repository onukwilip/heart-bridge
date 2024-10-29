import { Skeleton } from "@mui/material";
import React from "react";

const LoadingSearch = () => {
  return (
    <div className="w-full h-[inherit] flex flex-col items-center p-2">
      <div className="w-full max-w-[600px] flex flex-col gap-8">
        {/* Search bar */}
        <div className="w-full flex flex-col sm:flex-row gap-x-3">
          {/* Search field */}
          <Skeleton
            animation="pulse"
            variant="rounded"
            className="rounded-xl !bg-primary-grey w-full"
            height={50}
            width={"100%"}
          />
          <Skeleton
            animation="pulse"
            variant="text"
            className="rounded !bg-primary-grey w-1/2"
            width={"50%"}
          />
        </div>

        {/* Results */}
        <div className="w-full">
          {[1, 2, 3, 4, 5].map((_) => (
            <div className="w-full flex flex-col xs:flex-row xs:items-center gap-x-3 gap-y-3 p-3 rounded-md border border-weak-grey transition hover:bg-weak-grey/5">
              {/* Image */}
              <Skeleton
                animation="pulse"
                variant="circular"
                className="rounded-full !bg-primary-grey w-[70px] h-[70px]"
                width={70}
                height={70}
              />
              {/* Content */}
              <div className="w-full flex flex-col gap-y-1">
                {/* Name */}
                <Skeleton
                  animation="pulse"
                  variant="text"
                  className="rounded !bg-primary-grey w-2/3"
                  width={"66.6%"}
                />
                {/* Location */}
                <div className="flex gap-x-3 gap-y-1 text-sm items-center">
                  <Skeleton
                    animation="pulse"
                    variant="text"
                    className="rounded !bg-primary-grey w-1/3"
                    width={"33.3%"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSearch;

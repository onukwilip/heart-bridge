import TabSection from "@/components/molecules/TabSection.component";
import { Skeleton } from "@mui/material";
import React, { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 items-center py-6 px-2">
      <TabSection className="w-full max-w-[700px] text-primary-grey flex gap-3">
        {/* Image container */}
        <div className="w-[150px] h-[100px] rounded overflow-hidden ">
          <Skeleton
            className="w-full h-full !bg-primary-grey"
            width={"100%"}
            height={"100%"}
            variant="rounded"
            animation="pulse"
          />
        </div>
        {/* Summary */}
        <div className="w-full flex-1">
          <Skeleton
            className="w-[100%] !bg-primary-grey"
            width={"100%"}
            variant="text"
            animation="pulse"
          />
          <Skeleton
            className="w-[80%] !bg-primary-grey"
            width={"80%"}
            variant="text"
            animation="pulse"
          />
        </div>
      </TabSection>
      {/* Amount */}
      <TabSection className="w-full max-w-[700px] text-primary-grey flex flex-col gap-4">
        <Skeleton
          className="w-[50%] h-full !bg-primary-grey"
          width={"50%"}
          variant="text"
          animation="pulse"
        />
        {/* Ammounts */}
        <div className="w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5, 6, 7].map((amt) => (
            <Skeleton
              className="w-[100%] h-full !bg-primary-grey"
              width={"100%"}
              variant="text"
              animation="pulse"
            />
          ))}
        </div>
        {/* Amount input field */}
        <div className="w-full h-[75px] flex gap-3 items-center">
          <Skeleton
            className="w-[20%] h-full !bg-primary-grey"
            width={"10%"}
            height={"100%"}
            variant="rounded"
            animation="pulse"
          />
          <Skeleton
            className="w-[80%] h-full !bg-primary-grey"
            width={"90%"}
            height={"100%"}
            variant="rounded"
            animation="pulse"
          />
        </div>
      </TabSection>
      {/* Payment */}
      <TabSection className="w-full max-w-[700px] text-primary-grey flex flex-col gap-4">
        {/* Payment method */}
        <Skeleton
          className="w-[50%] h-full !bg-primary-grey"
          width={"50%"}
          variant="text"
          animation="pulse"
        />
        {/* Options */}
        <div className="flex flex-col w-full first:!rounded-t-2xl last:!rounded-b-2xl">
          {[1, 2, 3].map((_, i) => (
            <div
              className={`w-full flex p-4 gap-4 items-center ${
                i === 0
                  ? "rounded-t-2xl border border-t-primary-grey border-l-primary-grey border-r-primary-grey border-b-0"
                  : i === 2
                  ? "rounded-b-2xl border border-b-primary-grey border-l-primary-grey border-r-primary-grey border-t-0"
                  : "border border-primary-grey"
              }`}
            >
              <Skeleton
                className="!bg-primary-grey"
                width={"25px"}
                height={"25px"}
                variant="circular"
                animation="pulse"
              />
              <Skeleton
                className="w-[150px] !bg-primary-grey"
                width={"150px"}
                variant="text"
                animation="pulse"
              />
            </div>
          ))}
        </div>
        {/* Payment trigger */}
        <div className="w-full max-w-[700px] h-[50px]">
          <Skeleton
            className="w-[100%] h-full !bg-primary-grey"
            width={"100%"}
            height={"100%"}
            variant="rounded"
            animation="pulse"
          />
        </div>
      </TabSection>
    </div>
  );
};

export default Loading;

/*
{[1,2,3].map((_, i) => (
            <div
              className={`w-full flex p-4  items-center ${
                i === 0
                  ? "rounded-t-2xl border border-t-primary-grey border-l-primary-grey border-r-primary-grey border-b-0"
                  : i === 2
                  ? "rounded-b-2xl border border-b-primary-grey border-l-primary-grey border-r-primary-grey border-t-0"
                  : "border border-primary-grey"
              }`}
            >
               <Skeleton
          className="!bg-primary-grey"
          width={"10px"}
          height={"10px"}
          variant="circular"
          animation="pulse"
        />
               <Skeleton
          className="w-[50%] h-full !bg-primary-grey"
          width={"50%"}
          variant="text"
          animation="pulse"
        />
            </div>
          ))}
*/

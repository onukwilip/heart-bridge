import ProfileHeader from "@/components/profile/ProfileHeader.component";
import { Skeleton } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full flex flex-col gap-10 p-2 items-center">
      {/* Profile header */}
      <div className="w-full max-w-[700px]">
        <ProfileHeader loading />
      </div>
      {/* Projects */}
      {[1, 2, 3, 4, 5].map(() => (
        <div className="w-full flex flex-col gap-2 max-w-[700px]">
          <Skeleton
            animation="pulse"
            variant="rectangular"
            className="rounded-md !bg-primary-grey"
            height={250}
          />
          <Skeleton
            animation="pulse"
            variant="rectangular"
            className="rounded-sm !bg-primary-grey w-1/3"
            height={15}
          />
          <Skeleton
            animation="pulse"
            variant="rectangular"
            className="rounded-sm !bg-primary-grey w-2/3"
            height={15}
          />
          <Skeleton
            animation="pulse"
            variant="rectangular"
            className="rounded-sm !bg-primary-grey w-3/5"
            height={15}
          />
        </div>
      ))}
    </div>
  );
};

export default Loading;

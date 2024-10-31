import { TProject, TUser } from "@/utils/types";
import { Models } from "appwrite";
import React, { FC } from "react";
import ProfileHeader from "./ProfileHeader.component";
import TabWrapper from "./TabWrapper.component";

const OrphanageProfile: FC<{
  user: TUser & { projects: TProject[] };
}> = ({ user }) => {
  return (
    <div className="w-full flex flex-col gap-10 p-2 items-center">
      {/* Profile header */}
      <div className="w-full max-w-[700px]">
        <ProfileHeader user={user} />
      </div>
      {/* Tabs */}
      <TabWrapper className="w-full max-w-[700px]" user={user} />
    </div>
  );
};

export default OrphanageProfile;

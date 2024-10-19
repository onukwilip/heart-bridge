import React from "react";
import UserProfileSection from "@/components/account/UserProfileSection.component";
import PersonalInformationSection from "./PersonalInformationSection.component";
import SecuritySection from "./SecuritySection.component";
import BioSection from "./BioSection.component";

const UserProfle = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Image + name */}
      <UserProfileSection />
      {/* Personal information */}
      <PersonalInformationSection />
      {/* Bio */}
      <BioSection />
      {/* Security */}
      <SecuritySection />
    </div>
  );
};

export default UserProfle;

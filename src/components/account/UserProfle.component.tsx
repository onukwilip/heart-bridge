import React from "react";
import TabSection from "@/components/molecules/TabSection.component";
import UserProfileSection from "@/components/account/UserProfileSection.component";
import PersonalInformationSection from "./PersonalInformationSection.component";
import SecuritySection from "./SecuritySection.component";

const UserProfle = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Image + name */}
      <UserProfileSection />
      {/* Personal information */}
      <PersonalInformationSection />
      {/* Security */}
      <SecuritySection />
    </div>
  );
};

export default UserProfle;

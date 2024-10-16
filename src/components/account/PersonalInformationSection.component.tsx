"use client";
import React from "react";
import TabSection from "../molecules/TabSection.component";
import EditButton from "../atoms/EditButton.component";
import PersonalInformationDetail from "./PersonalInformationDetail.component";
import { useUserContext } from "@/contexts/User.context";
import { SIGNUP_FORMSTATE } from "@/utils/types";
import SectionHeader from "./SectionHeader.component";

const PersonalInformationSection = () => {
  const { user } = useUserContext();

  return (
    <TabSection className="flex flex-col w-full gap-4">
      {/* Heading + Edit btn */}
      <SectionHeader onEditClick={() => {}}>
        <span>Personal information</span>
      </SectionHeader>
      {/* Details */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-2">
        {Object.entries(user?.prefs || {}).map(([key, value]) => (
          <PersonalInformationDetail title={key} value={value || "-"} />
        ))}
        <PersonalInformationDetail
          title={SIGNUP_FORMSTATE.EMAIL}
          value={user?.email || "-"}
          no_capitalize
        />
      </div>
    </TabSection>
  );
};

export default PersonalInformationSection;

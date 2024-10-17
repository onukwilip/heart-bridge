"use client";
import React from "react";
import TabSection from "../molecules/TabSection.component";
import EditButton from "../atoms/EditButton.component";
import PersonalInformationDetail from "./PersonalInformationDetail.component";
import { useUserContext } from "@/contexts/User.context";
import { SIGNUP_FORMSTATE } from "@/utils/types";
import SectionHeader from "./SectionHeader.component";

const SecuritySection = () => {
  const { user } = useUserContext();

  return (
    <TabSection className="flex flex-col w-full gap-4">
      {/* Heading + Edit btn */}
      <SectionHeader onEditClick={() => {}}>
        <span>Security</span>
      </SectionHeader>
      {/* Password */}
      <div className="w-full">
        <PersonalInformationDetail
          title={SIGNUP_FORMSTATE.PASSWORD}
          value={"********"}
          no_capitalize
        />
      </div>
    </TabSection>
  );
};

export default SecuritySection;

"use client";
import React from "react";
import TabSection from "../molecules/TabSection.component";
import EditButton from "../atoms/EditButton.component";
import PersonalInformationDetail from "./PersonalInformationDetail.component";
import { useUserContext } from "@/contexts/User.context";
import { SIGNUP_FORMSTATE } from "@/utils/types";

const SecuritySection = () => {
  const { user } = useUserContext();

  return (
    <TabSection className="flex flex-col w-full gap-4">
      {/* Heading + Edit btn */}
      <div className="w-full flex flex-wrap items-center gap-6 justify-between">
        <span>Security</span>
        <EditButton />
      </div>
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

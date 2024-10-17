import React from "react";
import TabSection from "../molecules/TabSection.component";
import SectionHeader from "./SectionHeader.component";
import PersonalInformationDetail from "./PersonalInformationDetail.component";

const BankAccount = () => {
  return (
    <TabSection className="flex flex-col w-full gap-4">
      {/* Heading + Edit btn */}
      <SectionHeader onEditClick={() => {}}>
        <span>Bank information</span>
      </SectionHeader>
      {/* Details */}
      <div className="w-full flex gap-x-36 gap-y-4 flex-wrap">
        <PersonalInformationDetail
          title={"Account number"}
          value={"1234567890"}
          no_capitalize
        />
        <PersonalInformationDetail
          title={"Account name"}
          value={"Prince Onukwili"}
        />
        <PersonalInformationDetail title={"Bank name"} value={"First bank"} />
      </div>
    </TabSection>
  );
};

export default BankAccount;

"use client";
import React from "react";
import TabSection from "../molecules/TabSection.component";
import SectionHeader from "./SectionHeader.component";
import PersonalInformationDetail from "./PersonalInformationDetail.component";

const orphanage_details = {
  location: {
    lat: 53.4737,
    lng: -2.2368,
  },
};

const Contact = () => {
  return (
    <TabSection className="flex flex-col w-full gap-4">
      {/* Heading + Edit btn */}
      <SectionHeader onEditClick={() => {}}>
        <span>Contact</span>
      </SectionHeader>
      {/* Details */}
      <div className="w-full">
        <PersonalInformationDetail
          title={"Address"}
          value={"81 CHS street, Knowhere"}
        />
      </div>
      <div className="mt-4">
        <iframe
          src={
            "https://maps.google.com/maps?q=" +
            orphanage_details.location?.lat +
            "," +
            orphanage_details.location?.lng +
            "&t=&z=15&ie=UTF8&iwloc=&output=embed"
          }
          width="100%"
          height="450"
          style={{ border: 0 }}
          className={"w-full h-[450px] rounded-lg"}
          loading="lazy"
          {...{ referrerpolicy: "no-referrer-when-downgrade" }}
          title="map"
        ></iframe>
      </div>
    </TabSection>
  );
};

export default Contact;

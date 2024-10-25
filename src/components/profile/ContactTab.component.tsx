"use client";
import React, { FC } from "react";
import TabSection from "@/components/molecules/TabSection.component";
import PersonalInformationDetail from "@/components/account/PersonalInformationDetail.component";
import { TUser } from "@/utils/types";

const orphanage_details = {
  location: {
    lat: 53.4737,
    lng: -2.2368,
  },
};

const ContactTab: FC<{ user: TUser }> = ({ user }) => {
  return (
    <TabSection className="flex flex-col w-full gap-4">
      {/* Details */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-2">
        <PersonalInformationDetail
          title={"Phone number"}
          value={user.phone_number || "-"}
          no_capitalize
          value_className="text-white"
        />
        <PersonalInformationDetail
          title={"Email"}
          value={user.email || "-"}
          no_capitalize
          value_className="text-white"
        />
        <PersonalInformationDetail
          title={"Address"}
          value={`${user.location?.address?.formatted_address || "-"}`}
          no_capitalize
          value_className="text-white"
        />
      </div>
      <div className="mt-4">
        <iframe
          src={
            "https://maps.google.com/maps?q=" +
            (user.location?.lat || orphanage_details.location?.lat) +
            "," +
            (user.location?.lng || orphanage_details.location?.lng) +
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

export default ContactTab;

"use client";
import React from "react";
import TabSection from "../molecules/TabSection.component";
import SectionHeader from "./SectionHeader.component";
import PersonalInformationDetail from "./PersonalInformationDetail.component";
import EditContact from "./EditContact.component";
import { useUserContext } from "@/contexts/User.context";
import { useModalContext } from "@/contexts/Modal.context";
import { TUser } from "@/utils/types";

const orphanage_details = {
  location: {
    lat: 53.4737,
    lng: -2.2368,
  },
};

const Contact = () => {
  const { user, refresh_user } = useUserContext();
  const { open_modal } = useModalContext();

  /**
   * * Function responsible for displaying the modal to edit user bank information
   */
  const handle_edit_click = () => {
    open_modal({
      children: (
        <EditContact
          existing_information={user?.prefs as TUser}
          user_id={user?.$id || ""}
          post_submit_function={refresh_user}
        />
      ),
    });
  };

  return (
    <TabSection className="flex flex-col w-full gap-4">
      {/* Heading + Edit btn */}
      <SectionHeader onEditClick={handle_edit_click}>
        <span>Contact</span>
      </SectionHeader>
      {/* Details */}
      <div className="w-full">
        <PersonalInformationDetail
          title={"Address"}
          value={user?.prefs.location?.address.formatted_address || "-"}
        />
      </div>
      {user?.prefs.location && (
        <div className="mt-4">
          <iframe
            src={
              "https://maps.google.com/maps?q=" +
              user.prefs.location.lat +
              "," +
              user.prefs.location.lng +
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
      )}
    </TabSection>
  );
};

export default Contact;

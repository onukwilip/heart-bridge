"use client";
import React, { useEffect } from "react";
import TabSection from "../molecules/TabSection.component";
import EditButton from "../atoms/EditButton.component";
import PersonalInformationDetail from "./PersonalInformationDetail.component";
import { useUserContext } from "@/contexts/User.context";
import { SIGNUP_FORMSTATE, TUser } from "@/utils/types";
import SectionHeader from "./SectionHeader.component";
import { useModalContext } from "@/contexts/Modal.context";
import EditBio from "./EditBio.component";
import { refresh_user_details } from "@/utils/account/account";

const BioSection = () => {
  const { user, populate_user } = useUserContext();
  const { open_modal, modal } = useModalContext();

  /**
   * * Function responsible for displaying the modal to edit user bank information
   */
  const handle_edit_click = () => {
    open_modal({
      children: (
        <EditBio
          existing_bio={user?.prefs?.bio || ""}
          existing_details={user?.prefs as TUser}
        />
      ),
    });
  };

  useEffect(() => {
    if (!modal.open) refresh_user_details(populate_user);
  }, [modal.open]);

  return (
    <TabSection className="flex flex-col w-full gap-4">
      {/* Heading + Edit btn */}
      <SectionHeader onEditClick={handle_edit_click}>
        <span>Bio information</span>
      </SectionHeader>
      {/* Bio */}
      <div className="w-full">
        <PersonalInformationDetail
          title={"bio"}
          value={
            <span
              dangerouslySetInnerHTML={{ __html: user?.prefs?.bio || "-" }}
            ></span>
          }
          no_capitalize
        />
      </div>
    </TabSection>
  );
};

export default BioSection;
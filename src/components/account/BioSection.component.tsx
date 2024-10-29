"use client";
import React, { useEffect } from "react";
import TabSection from "../molecules/TabSection.component";
import EditButton from "../atoms/EditButton.component";
import PersonalInformationDetail from "./PersonalInformationDetail.component";
import { useUserContext } from "@/contexts/User.context";
import { USER_FORMSTATE, TUser } from "@/utils/types";
import SectionHeader from "./SectionHeader.component";
import { useModalContext } from "@/contexts/Modal.context";
import EditBio from "./EditBio.component";
import { refresh_user_details } from "@/utils/account/account";

const BioSection = () => {
  const { user, refresh_user } = useUserContext();
  const { open_modal } = useModalContext();

  /**
   * * Function responsible for displaying the modal to edit user bank information
   */
  const handle_edit_click = () => {
    open_modal({
      children: (
        <EditBio
          existing_bio={user?.prefs?.bio || ""}
          existing_details={{ ...user?.prefs, email: user?.email } as TUser}
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
        <span>Bio information</span>
      </SectionHeader>
      {/* Bio */}
      <div className="w-full">
        <PersonalInformationDetail
          title={"bio"}
          value={
            <span
              dangerouslySetInnerHTML={{ __html: user?.prefs?.bio || "-" }}
              className="list"
            ></span>
          }
          no_capitalize
        />
      </div>
    </TabSection>
  );
};

export default BioSection;

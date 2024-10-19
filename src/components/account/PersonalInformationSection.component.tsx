"use client";
import React, { useEffect } from "react";
import TabSection from "../molecules/TabSection.component";
import EditButton from "../atoms/EditButton.component";
import PersonalInformationDetail from "./PersonalInformationDetail.component";
import { useUserContext } from "@/contexts/User.context";
import { SIGNUP_FORMSTATE, TUser } from "@/utils/types";
import SectionHeader from "./SectionHeader.component";
import { Skeleton } from "@mui/material";
import { useModalContext } from "@/contexts/Modal.context";
import EditUserProfile from "./EditUserProfile.component";
import { refresh_user_details } from "@/utils/account/account";

const PersonalInformationSection = () => {
  const { user, populate_user } = useUserContext();
  const { open_modal, modal } = useModalContext();

  /**
   * * Function responsible for displaying the modal to edit user bank information
   */
  const handle_edit_click = () => {
    open_modal({
      children: (
        <EditUserProfile
          existing_information={{ ...user?.prefs, email: user?.email } as TUser}
          user_id={user?.$id || ""}
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
        <span>Personal information</span>
      </SectionHeader>
      {/* Details */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-2">
        {/* Firstname */}
        <PersonalInformationDetail
          title={"firstname"}
          value={
            user?.prefs?.firstname || (
              <Skeleton
                animation="pulse"
                width={"50%"}
                className="!bg-weak-grey/10"
              />
            )
          }
        />
        {/* Lastname */}
        <PersonalInformationDetail
          title={"lastname"}
          value={
            user?.prefs?.lastname || (
              <Skeleton
                animation="pulse"
                width={"50%"}
                className="!bg-weak-grey/10"
              />
            )
          }
        />
        {/* Orphanage name */}
        {user?.prefs?.account_type === "orphanage" && (
          <PersonalInformationDetail
            title={"orphanage name"}
            value={
              user.prefs.orphanage_name || (
                <Skeleton
                  animation="pulse"
                  width={"50%"}
                  className="!bg-weak-grey/10"
                />
              )
            }
          />
        )}
        {/* Email */}
        <PersonalInformationDetail
          title={SIGNUP_FORMSTATE.EMAIL}
          value={
            user?.email || (
              <Skeleton
                animation="pulse"
                width={"50%"}
                className="!bg-weak-grey/10"
              />
            )
          }
          no_capitalize
        />
      </div>
    </TabSection>
  );
};

export default PersonalInformationSection;

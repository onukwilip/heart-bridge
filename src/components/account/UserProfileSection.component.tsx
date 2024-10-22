"use client";
import React, { FC, useEffect } from "react";
import { useUserContext } from "@/contexts/User.context";
import Image from "next/image";
import dummy_image from "@/images/dummy-profile-pic.png";
import TabSection from "@/components/molecules/TabSection.component";
import SectionHeader from "./SectionHeader.component";
import { useModalContext } from "@/contexts/Modal.context";
import EditUserProfile from "./EditUserProfile.component";
import { TUser } from "@/utils/types";
import { refresh_current_user } from "@/utils/appwrite/auth.utils";
import { refresh_user_details } from "@/utils/account/account";

const UserProfileSection: FC = () => {
  const { user, refresh_user } = useUserContext();
  const { open_modal } = useModalContext();

  /**
   * * Function responsible for displaying the modal to edit user bank information
   */
  const handle_edit_click = () => {
    open_modal({
      children: (
        <EditUserProfile
          existing_information={{ ...user?.prefs, email: user?.email } as TUser}
          user_id={user?.$id || ""}
          post_submit_function={refresh_user}
        />
      ),
    });
  };

  return (
    <TabSection>
      <SectionHeader onEditClick={handle_edit_click}>
        {/* Image + name */}
        <div className="flex gap-4 items-center">
          {/* Image container */}
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
            <Image
              width={80}
              height={80}
              src={user?.prefs?.image || dummy_image.src}
              alt={user?.prefs?.firstname || ""}
              className="object-cover w-[80px] h-[80px]"
            />
          </div>
          {/* Name */}
          <div className="flex flex-col justify-center items-start capitalize">
            {/* Orphanage name OR donor name */}
            <span className="text-md">
              {user?.prefs?.account_type === "donor"
                ? `${user?.prefs?.firstname} ${user?.prefs?.lastname}`
                : user?.prefs?.orphanage_name}
            </span>
            {/* Account type */}
            <span className="text-sm text-primary-grey">
              {user?.prefs?.account_type}
            </span>
          </div>
        </div>
      </SectionHeader>
    </TabSection>
  );
};

export default UserProfileSection;

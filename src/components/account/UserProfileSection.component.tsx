"use client";
import React, { FC } from "react";
import { useUserContext } from "@/contexts/User.context";
import Image from "next/image";
import dummy_image from "@/images/dummy-profile-pic.png";
import TabSection from "@/components/molecules/TabSection.component";
import EditButton from "../atoms/EditButton.component";
import SectionHeader from "./SectionHeader.component";

const UserProfileSection: FC = () => {
  const { user } = useUserContext();

  return (
    <TabSection>
      <SectionHeader onEditClick={() => {}}>
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

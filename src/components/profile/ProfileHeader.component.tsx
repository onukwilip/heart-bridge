import { TUser } from "@/utils/types";
import Image from "next/image";
import React, { FC } from "react";
import cover_image from "@/images/photo-1543689604-6fe8dbcd1f59 1.png";
import dummy_image from "@/images/dummy-profile-pic.png";
import Button from "../atoms/Button.component";

const ProfileHeader: FC<{ user: TUser }> = ({ user }) => {
  return (
    <div className="w-full h-[250px] relative flex items-end">
      {/* Cover image comtainer */}
      <div className="w-full h-[150px] xs:h-[200px] absolute top-0 left-0 overflow-hidden rounded">
        <img
          src={cover_image.src}
          alt="cover image"
          className="w-[750px] h-[200px] object-cover"
        />
      </div>
      {/* Profile contents */}
      <div className="w-full flex flex-col xs:flex-row items-start xs:items-end justify-between gap-4 relative z-10 px-4">
        {/* Image + name */}
        <div className="flex gap-2 items-end">
          {/* Profile image */}
          <div className="w-[105px] h-[105px] overflow-hidden rounded-full border-[2px] border-white">
            <Image
              src={user.image || dummy_image.src}
              alt="profile image"
              className="w-[105px] h-[105px] object-cover"
              width={300}
              height={300}
            />
          </div>
          {/* Orphanage name */}
          <div className="capitalize text-lg xs:text-xl text-white">
            {user.orphanage_name}
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-2">
          <Button className="h-[30px] w-[100px]">
            <span className="!text-2xs">Book a visit</span>{" "}
          </Button>
          <Button className="h-[30px] w-fit" outlined size="small">
            <i className="fas fa-phone !text-xs"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
